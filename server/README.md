# Portfolio Backend

This folder contains a clean and scalable backend scaffold for the portfolio project.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a local environment file:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Routes

- GET /api/health
- POST /api/recruiter/schedule
- GET /api/recruiter/requests
- GET /api/recruiter/requests/:id
- PATCH /api/recruiter/requests/:id/status
- POST /api/freelance/request
- GET /api/freelance/requests
- GET /api/freelance/requests/:id
- PATCH /api/freelance/requests/:id/status
