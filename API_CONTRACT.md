# API Contract — Booking Backend

## 1. Entities

### Booking

| Field        | Type     | Required | Notes                                                |
|--------------|----------|----------|------------------------------------------------------|
| `id`         | string   | ✓        | Auto-generated UUID, e.g. `uuid-xxxx`                |
| `clientName` | string   | ✓        | From form `name`                                     |
| `email`      | string   | ✓        | Validated email                                      |
| `phone`      | string   | ✓        | Validated phone                                      |
| `service`    | string   | ✓        | One of: `airport`, `corporate`, `group`, `private`   |
| `pickup`     | string   | ✓        | Pickup location                                      |
| `destination`| string   | ✓        | Drop-off location                                    |
| `date`       | string   | ✓        | Combined from `date` + `time` → ISO string           |
| `status`     | string   | ✓        | One of: `confirmed`, `pending`, `completed`, `cancelled`. Default: `pending` |
| `company`    | string   | ✗        | Optional company name                                |
| `passengers` | number   | ✗        | Min 1                                                |
| `meetAndGreet` | boolean | ✗      | Default `false`                                      |
| `notes`      | string   | ✗        | Optional notes                                       |
| `createdAt`  | string   | ✓        | ISO timestamp, set by backend                        |
| `updatedAt`  | string   | ✓        | ISO timestamp, set by backend                        |

## 2. Form Data → Backend Mapping

The frontend `BookingFormValues` sends:

```json
{
  "name": "string",
  "company": "string?",
  "phone": "string",
  "email": "string",
  "service": "string",
  "pickup": "string",
  "destination": "string",
  "date": "string (YYYY-MM-DD)",
  "time": "string (HH:mm)",
  "passengers": "number",
  "meetAndGreet": "string ('yes' | 'no')",
  "notes": "string?"
}
```

Backend combines `date` + `time` into a single `date` field (ISO string), converts `meetAndGreet` from string to boolean, and adds `id`, `status`, `createdAt`, `updatedAt`.

## 3. API Endpoints

Base URL: `http://localhost:3001/api`

### POST /api/bookings

Create a new booking.

- **Request body**: JSON matching form data (see §2)
- **Success response**: `201 Created`
  ```json
  {
    "id": "uuid-xxxx",
    "clientName": "...",
    "email": "...",
    "phone": "...",
    "service": "...",
    "pickup": "...",
    "destination": "...",
    "date": "2026-06-10T12:00:00.000Z",
    "status": "pending",
    "company": "...",
    "passengers": 2,
    "meetAndGreet": true,
    "notes": "...",
    "createdAt": "2026-06-09T...",
    "updatedAt": "2026-06-09T..."
  }
  ```
- **Error responses**:
  - `400 Bad Request` — validation errors
    ```json
    { "message": ["name should not be empty", "email must be an email"], "error": "Bad Request", "statusCode": 400 }
    ```
  - `409 Conflict` — duplicate / business logic conflict (if applicable)

### GET /api/bookings

Get all bookings.

- **Query params**:
  - `search` (optional) — filter by clientName, phone, pickup, destination
  - `status` (optional) — filter by status
- **Success response**: `200 OK`
  ```json
  [
    { /* booking object */ },
    { /* booking object */ }
  ]
  ```

### GET /api/bookings/:id

Get a single booking by ID.

- **Success response**: `200 OK` → single booking object
- **Error response**: `404 Not Found`
  ```json
  { "message": "Booking with id 'xxx' not found", "error": "Not Found", "statusCode": 404 }
  ```

### PATCH /api/bookings/:id/status

Update booking status.

- **Request body**:
  ```json
  { "status": "confirmed" }
  ```
- **Valid statuses**: `confirmed`, `pending`, `completed`, `cancelled`
- **Success response**: `200 OK` → updated booking object
- **Error responses**:
  - `400 Bad Request` — invalid status value
  - `404 Not Found` — booking not found

## 4. Frontend Changes from Stage 2

The following files will be modified:

| File | Change |
|------|--------|
| `src/components/BookingForm.tsx` | Replace `setSubmitted(true)` with HTTP POST to `/api/bookings`; add loading/error/success states |
| `src/components/BookingTable.tsx` | Replace `mockBookings` import with HTTP GET from `/api/bookings`; add loading/error states |
| `src/components/BookingTable.tsx` | PATCH status updates via API instead of local state |
| `src/lib/mock-data.ts` | No longer imported in components (can be removed or kept as fallback) |

## 5. How Data Flows

```
BookingForm → POST /api/bookings → Backend validates → Stores in memory
                                                         ↓
                                                 Returns created booking
                                                         ↓
BookingForm shows success message with booking ID

ManagerPage → GET /api/bookings → Backend returns all bookings
                                               ↓
                                    BookingTable renders list

ManagerPage → PATCH /api/bookings/:id/status → Backend updates status
                                               ↓
                                    BookingTable re-renders
```

## 6. Error Format

All errors follow NestJS default format:
```json
{
  "message": "string | string[]",
  "error": "string",
  "statusCode": 400 | 404 | 409 | 500
}
```

## 7. Architecture Decisions & Compromises

| Decision | Rationale |
|----------|-----------|
| **In-memory storage** | MVP within 1-2 days; no DB setup needed; data resets on restart |
| **No authentication** | MVP scope; manager page is open |
| **Single NestJS module** | Only one entity (Booking); no need for modular splitting yet |
| **date+time combined on backend** | Single field simplifies storage and sorting |
| **Separate port (3001)** | NestJS runs independently; CORS allows requests from Next.js (port 3000) |
| **No pagination** | MVP; assumes <1000 bookings |
