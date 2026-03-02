# AI Infrastructure & Deployment Manifest

This document contains critical operational rules to ensure AI agents and developers can build and deploy correctly on the current server environment.

## 1. Database Configuration (PostgreSQL 15+)
- **Schema Permissions:** In PostgreSQL 15+, the `public` schema does not grant `CREATE` privileges to non-superusers by default.
- **Rule:** Always ensure the application database user has explicit permissions: `GRANT ALL ON SCHEMA public TO [user];`.
- **Tooling:** Use `npx prisma db push --accept-data-loss` for development-to-production syncing, but ensure the user has permissions BEFORE running this command.

## 2. User & Permission Architecture
- **GitHub Actions Runner:** Runs as the `github-runner` user.
- **Production Application:** Runs as the `ubuntu` user via PM2.
- **Build Process:** Perform all `npm install`, `npx prisma`, and `npm run build` steps as the `github-runner` user.
- **Deployment:** ONLY use `sudo -u ubuntu` for PM2 commands (`pm2 reload`, `pm2 start`, `pm2 save`).
- **Rule:** NEVER run `npm install` with `sudo -u ubuntu` as it causes permission conflicts and slowness (6+ minutes).

## 3. Server Resource Constraints
- **Memory Limit:** The production server has <2GB RAM.
- **Rule:** Always use `NODE_OPTIONS="--max-old-space-size=1536"` during build steps to prevent Out-Of-Memory (OOM) crashes.
- **Optimization:** Ensure the server has at least 2GB of Swap space enabled.
- **Build Tooling:** Use Turbopack (`next build --turbo`) cautiously as it is memory-intensive.

## 4. Framework Quirks (Next.js 14+ & Tailwind CSS v4)
- **Next.js Build Flags:** Modern Next.js does not support `--no-lint` or `--no-types`. 
- **Rule:** Use `ignoreBuildErrors: true` in `next.config.ts` for TypeScript and `eslint: { ignoreDuringBuilds: true }` for ESLint.
- **Tailwind v4:** The PostCSS plugin is located in `devDependencies`.
- **Rule:** Deployment scripts must use `npm ci --include=dev` to ensure Tailwind build tools are available.

---
*Last updated: March 1, 2026*
