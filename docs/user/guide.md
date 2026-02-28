# User Documentation: VoltKenya Unified Platform

Welcome to the new unified VoltKenya platform. This project combines the mobile and web views into a single, responsive Next.js application.

## Getting Started

1.  **Installation**: Run `npm install` in the root directory.
2.  **Development**: Run `npm run dev` to start the development server on `http://localhost:3020`.
3.  **Port**: The application is explicitly configured to run on port 3020.

## Project Features

- **Responsive Design**: The application automatically detects your device type and serves a mobile-optimized layout (with bottom navigation) or a web-optimized layout.
- **Unified Catalog**: A shared data source (`lib/data.ts`) ensures consistency across all views.
- **Admin Dashboard**: A placeholder admin dashboard is available at `/admin` for future inventory management.
- **Lipa Pole Pole Integration**: Integrated financing options and order flow.

## Project Structure

- `app/`: Contains all the routes and the root layout.
- `components/`:
  - `mobile/`: Mobile-specific components.
  - `web/`: Web-specific components.
  - `shared/`: Components used by both views.
- `lib/`: Utilities, device detection, and shared data.
- `docs/`: Reference documentation for users and developers.
