# Educase Backend (School APIs)

## Setup

1. Install dependencies:
   - `npm install`
2. Start MySQL with Docker:
   - `docker compose up -d`
3. Configure env vars (see `.env.example`)
4. Run migrations:
   - `npm run db:migrate`
5. Start the server:
   - `npm run dev`

## Module Structure

Everything related to the School module lives under `src/app/school`.

## Endpoints

- `GET /health`
- `POST /addSchool`
- `GET /listSchools?latitude=...&longitude=...`

## Testing

Import [`educase-backend.postman_collection.json`](./educase-backend.postman_collection.json) into Postman.

> Update the `baseUrl` collection variable to your hosted API URL before testing.
