// docs/backend-integration.md

# Backend Integration Guide

This project is prepared for a full backend integration. Currently, it uses mock data and placeholder API routes.

## API Routes

- `GET /api/bikes`: Fetches all bikes.
- `POST /api/bikes`: Placeholder for adding a bike.
- `GET /api/categories`: Fetches bike categories.

## Switching to a Real Backend

1. **Database**: Choose a database (e.g., PostgreSQL with Prisma).
2. **Environment Variables**: Add your database URL to `.env.local`.
3. **Data Fetching**: Update `lib/api-client.ts` or the API routes in `app/api/` to pull from the database instead of the mock data in `lib/data.ts`.

## Admin Features

The `/admin` route is a placeholder dashboard. You can extend it with forms to interact with the `POST` endpoints.
