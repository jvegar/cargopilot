declare module 'eventstore' {
  interface IEventStoreOptions {
    type: string;
    url: string;
    options?: any;
  }

  interface IEvent {
    payload: any;
  }

  interface ISnapshot {
    data: any;
  }

  interface IStream {
    lastRevision: number;
    addEvent(event: any): void;
    commit(callback: (err: Error) => void): void;
    events: IEvent[];
  }

  export interface IEventStore {
    init(callback: (err?: Error) => void): void;
    getFromSnapshot(
      aggregateId: string,
      callback: (err: Error, snapshot: ISnapshot, stream: IStream) => void,
    ): void;
    createSnapshot(
      { streamId: string, data: any, revision: number, version: number },
      callback: (err: Error) => void,
    ): void;
    getEvents(from: number, to: number, callback: (err: Error, events: IEvent[]) => void): void;
    getEventStream(
      options: { aggregateId: string; aggregate: string },
      callback: (err: Error, stream: IStream) => void,
    ): void;
    getEventStream(
      aggregateId: string,
      revMin: number,
      revMax: number,
      callback: (err: Error, stream: IStream) => void,
    ): void;
  }

  export default function eventstore(options: IEventStoreOptions): IEventStore;
}
