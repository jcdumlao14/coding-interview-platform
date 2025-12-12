# Real-Time Coding Interview Platform

An end-to-end real-time collaborative coding platform with support for JavaScript and Python execution.

## Tech Stack
- **Frontend**: React, Vite, CodeMirror, Socket.io-client
- **Backend**: Express, Socket.io
- **Execution**: `eval()` (JS), Pyodide (Python)

## Directory Structure
- `/client`: Frontend application
- `/server`: Backend application

## Installation

1. Install dependencies for the root, server, and client:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

## Running the Project

To run both the client and server concurrently:
```bash
npm run dev
```
- Client runs on: `http://localhost:5174/jh986y`
- Server runs on: `http://localhost:3000`

## Integration Tests

To run the server integration tests (uses Node.js built-in test runner):
```bash
npm test
```
Or directly:
```bash
cd server && npm test
```

## Docker Deployment (Production)

The application is dockerized to run as a single container serving both frontend and backend.

1. **Build the Image**:
   ```bash
   docker build -t coding-platform .
   ```

2. **Run the Container**:
   ```bash
   docker run -p 3001:3001 coding-platform
   ```
   - Access the app at `http://localhost:3001`

## Deployment (Render)

The easiest way to deploy this Dockerized app is via [Render](https://render.com).

### Prerequisites
- Push this repository to GitHub/GitLab.

### Method A: Blueprints (Recommended)
1. Ensure `render.yaml` is in the root of your repo.
2. Go to the Render Dashboard and click **New > Blueprint**.
3. Connect your repository.
4. Render will automatically detect the configuration from `render.yaml` and deploy accordingly.

### Method B: Manual Setup
1. Create a new **Web Service** on Render.
2. Connect your repository.
3. Select **Docker** as the Runtime.
4. Set the following Environment Variables:
   - `PORT`: `3001`
5. Click **Create Web Service**.

### Configuration Details
- **Config File**: `render.yaml` (included)
- **Port**: 3001
- **Health Check**: `/`
- **Build Context**: Root directory (contains Dockerfile)
