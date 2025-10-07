import { StorableEvent } from './interfaces/storable-event';
import eventstore, { IEventStore } from 'eventstore';
import * as url from 'url';

export class EventStore {
  private readonly eventstore: IEventStore;
  private eventStoreLaunched = false;
  readonly snapshotLimit: any;

  constructor(mongoURL: string) {
    let ssl = false;

    const parsed = url.parse(mongoURL, true);

    if (parsed.query && parsed.query.ssl !== undefined && parsed.query.ssl === 'true') {
      ssl = true;
    }

    this.eventstore = eventstore({
      type: 'mongodb',
      url: mongoURL,
      options: {
        ssl: ssl,
      },
    });
    this.eventstore.init(err => {
      if (err) {
        throw err;
      }
      this.eventStoreLaunched = true;
    });
  }

  public isInitiated(): boolean {
    return this.eventStoreLaunched;
  }

  public getStream(
    aggregate: string,
    id: string,
    revMin: number,
    revMax: number,
  ): Promise<unknown> {
    return new Promise((res, rej) => {
      this.eventstore.getEventStream(
        this.getAgrregateId(aggregate, id),
        revMin,
        revMax,
        (err, stream) => {
          if (err) rej(err);
          res(stream.events.map(event => this.getStorableEventFromPayload(event.payload)));
        },
      );
    });
  }

  public storeSnapshotingPoint(aggregate, id, data, version = 1) {
    const streamId = this.getAgrregateId(aggregate, id);
    return new Promise((res, rej) => {
      this.eventstore.getFromSnapshot(streamId, (err, snapshot, stream) => {
        this.eventstore.createSnapshot(
          {
            streamId,
            data,
            revision: stream.lastRevision,
            version,
          },
          err => (err ? rej(err) : res(true)),
        );
      });
    });
  }

  public async getEventsAndSnapshot(
    aggregate: string,
    id: string,
  ): Promise<{
    snapshot: any;
    events: StorableEvent[];
  }> {
    const streamId = this.getAgrregateId(aggregate, id);
    return new Promise((res, rej) => {
      this.eventstore.getFromSnapshot(streamId, (err, snapshot, stream) => {
        const snap = snapshot === null || snapshot === void 0 ? void 0 : snapshot.data;
        res({
          snapshot: snap,
          events: stream.events.map(event => this.getStorableEventFromPayload(event.payload)),
        });
      });
    });
  }

  public async getEvents(aggregate: string, id: string): Promise<StorableEvent[]> {
    return new Promise<StorableEvent[]>(resolve => {
      this.eventstore.getFromSnapshot(
        this.getAgrregateId(aggregate, id),
        (err, snapshot, stream) => {
          // snapshot.data; // Snapshot
          resolve(stream.events.map(event => this.getStorableEventFromPayload(event.payload)));
        },
      );
    });
  }

  public async getEvent(index: number): Promise<StorableEvent> {
    return new Promise<StorableEvent>((resolve, reject) => {
      this.eventstore.getEvents(index, 1, (err, events) => {
        if (events.length > 0) {
          resolve(this.getStorableEventFromPayload(events[0].payload));
        } else {
          resolve(null);
        }
      });
    });
  }

  public async storeEvent<T extends StorableEvent>(event: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.eventStoreLaunched) {
        reject('Event Store not launched!');
        return;
      }
      this.eventstore.getEventStream(
        {
          aggregateId: this.getAgrregateId(event.eventAggregate, event.id),
          aggregate: event.eventAggregate,
        },
        (err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          stream.addEvent(event);
          stream.commit(commitErr => {
            if (commitErr) {
              reject(commitErr);
            }
            resolve();
          });
        },
      );
    });
  }

  private getAgrregateId(aggregate: string, id: string): string {
    return aggregate + '-' + id;
  }

  // Monkey patch to obtain event 'instances' from db
  private getStorableEventFromPayload(payload: any): StorableEvent {
    const eventPlain = payload;
    eventPlain.constructor = { name: eventPlain.eventName };

    return Object.assign(Object.create(eventPlain), eventPlain);
  }
}
