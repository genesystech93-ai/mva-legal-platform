# InjuryClaims & MVA Legal Intake Platform

A modern, high-performance Node.js legal intake and case review web application with ActiveProspect TrustedForm consent certification and an Admin Lead Management & Excel/CSV Export Portal.

## Architecture

- **Backend / Server**: Node.js & Express (`server.js`)
  - REST API endpoints for submitting leads, fetching live counts, and streaming Excel (`.xlsx`) & CSV files directly to physical downloads.
  - Development mode (`--dev`) uses Vite's programmatic Node.js API with zero external configuration file.
  - Production mode serves compiled assets from `dist/` with disk-persisted data in `data/leads.json`.
- **Frontend**: React 19 + Tailwind CSS v4 + Lucide Icons
  - Interactive 60-Second Legal Intake Wizard with multi-step validation.
  - Real-time ActiveProspect TrustedForm certificate generation and inspector.
  - Secure Admin Portal with SHA-256 hashed password verification and server-side XLSX generation.

## Available Scripts

- `npm run dev`: Starts the Node.js development server with hot reload at `http://127.0.0.1:5174`
- `npm run build`: Compiles the production bundle via `build.js` into `dist/`
- `npm start`: Runs the Node.js production server serving `dist/`
