# Educase Backend (School APIs)

## Setup

1. Install dependencies:
   - `npm install`
2. Start MySQL with Docker:
   - `docker compose up -d`
3. Configure env vars (see `.env.example`), especially `DATABASE_URL`.
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
