// docs/ai/references.md

# AI Agent Reference Guide

This project is a unified Next.js 16 application serving both mobile and web views.

## Project Structure

- `app/layout.tsx`: Root layout with device detection (server-side + client-side hydration).
- `lib/device.ts`: Server-side device detection utility using `user-agent`.
- `components/mobile/`: Components specific to the mobile view.
- `components/web/`: Components specific to the web view.
- `components/shared/`: Shared components (e.g., `MotorcycleCard`).

## Key Patterns

- **Responsive Handling**: The `RootLayout` detects the device and wraps the content in either a mobile shell (with `BottomNav`) or a web shell (with `Navbar`/`Footer`).
- **Data Layer**: All bike data is centralized in `lib/data.ts` to ensure consistency between views.
