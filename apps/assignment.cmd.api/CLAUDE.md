# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start Commands

```bash
# Install dependencies
pnpm install

# Development server with hot reload
pnpm run start:dev

# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Build for production
pnpm run build

# Lint code
pnpm run lint

# Format code
pnpm run format
```

## Architecture Overview

**Event-Sourced Microservice** built with NestJS + TypeScript using CQRS/DDD patterns:
- **Monorepo**: pnpm workspaces with Nx orchestration
- **Event Store**: MongoDB (`mongodb://localhost:27017/assignments-eventstore`)
- **Message Broker**: Kafka (`localhost:9092` for dev)
- **Core Domains**: Assignment, Shift (workday tracking)

## Key Patterns

- **StorableAggregateRoot**: Base for domain aggregates
- **EventStore**: MongoDB persistence with snapshotting
- **Commands** → **Events** → **Aggregate state changes**
- **Kafka events** for inter-service communication

## Testing

- **Unit tests**: `*.spec.ts` files with Jest
- **E2E tests**: `*.e2e-spec.ts` in `test/` directory
- **Coverage**: `pnpm run test:cov`

## Environment Setup

Required services:
- MongoDB on localhost:27017
- Kafka on localhost:9092
- Node.js with pnpm

## Project Structure

- `src/assignment/` - Assignment domain (scheduling)
- `src/shift/` - Shift domain (workday tracking)
- `src/shift/models/` - WorkDayAggregate, WorkDayOverrideAggregate
- `src/shift/repositories/` - Event-sourced repositories
- `packages/` - Shared workspace packages