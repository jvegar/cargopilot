import { Injectable } from '@nestjs/common';
import { EventStore, StoreEventPublisher } from '@cargopilot/event-sourcing';
import { WorkDayOverrideAggregate } from '../models';
import { EventAggregateEnum } from '@cargopilot/microservice.core';
