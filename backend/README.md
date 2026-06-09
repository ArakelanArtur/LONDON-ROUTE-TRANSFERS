# Backend — Booking API

NestJS backend for LONDON ROUTE TRANSFERS booking system.

## Stack

- **NestJS** (Node.js framework)
- In-memory storage (data resets on restart)

## Setup

```bash
cd backend
npm install
```

## Development

```bash
npm run start:dev
```

Server starts at `http://localhost:3001`.

## Production

```bash
npm run build
npm run start:prod
```

## API Endpoints

| Method | Endpoint                     | Description            |
|--------|------------------------------|------------------------|
| POST   | `/api/bookings`              | Create a booking       |
| GET    | `/api/bookings`              | List all bookings      |
| GET    | `/api/bookings/:id`          | Get booking by ID      |
| PATCH  | `/api/bookings/:id/status`   | Update booking status  |

See [API_CONTRACT.md](../API_CONTRACT.md) for full details.
