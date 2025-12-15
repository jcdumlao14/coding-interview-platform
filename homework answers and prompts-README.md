# End-to-End Application: Coding Interview Platform

This repository contains a full-stack real-time collaborative coding platform built for the **End-to-End Application Development** course. It features real-time synchronization, syntax highlighting, and client-side code execution for JavaScript and Python.

---

## Part 1: Homework Form Answers

Below are the specific answers and commands used for the course submission form.

### Question 1: Initial Implementation (The Prompt)
> Build a complete end-to-end online coding interview application.
> 1. Frontend: React + Vite. Use @monaco-editor/react for the code editor.
> 2. Backend: Express.js + Socket.io for real-time collaboration.
> 3. Features:
>    - Real-time code syncing between users.
>    - Syntax highlighting for JavaScript and Python.
>    - Client-side code execution: Use Pyodide for Python and a WebWorker for JavaScript.
> 4. Structure: Create /client and /server directories.
> 5. Create a Dockerfile for the production build.
> 6. Create a README.md with run instructions.

### Question 2: Integration Tests
```bash
npm test
```
### Question 3: Running Both Client and Server

```bash
concurrently "npm run dev:server" "npm run dev:client"
```
### Question 4: Syntax Highlighting
```
@monaco-editor/react (or CodeMirror)
```
### Question 5: Python WASM library
```
Pyodide
```

### Question 6: Containerization
```
node:18-bullseye-slim
```

### Question 7: Deployment
```
Render
```

## Part 2: Development Procedure (Antigravity Workflow)

This project was built using **Antigravity** agents. Below is the step-by-step procedure and the exact prompts used to generate the codebase.

## Step 1: Generate the Core Application

**Goal**: Creates the file structure, server, client, and logic.

**Prompt**:

create file setup_project.sh

Write the following shell script content:

### !/bin/bash
mkdir -p server client/src

### Initialize Server
cd server
```
echo '{ "name": "server", "type": "module", "scripts": { "dev": "node index.js", "test": "node --test" }, "dependencies": { "express": "^4.18.2", "socket.io": "^4.7.2", "cors": "^2.8.5" } }' > package.json
echo 'import express from "express"; import { createServer } from "http"; import { Server } from "socket.io"; import cors from "cors"; const app = express(); app.use(cors()); const httpServer = createServer(app); const io = new Server(httpServer, { cors: { origin: "*" } }); io.on("connection", (socket) => { socket.on("code-update", (code) => { socket.broadcast.emit("code-update", code); }); }); httpServer.listen(3001, () => console.log("Server on 3001"));' > index.js
```
### Initialize Client
```
cd ../client
echo '{ "name": "client", "scripts": { "dev": "vite", "build": "vite build" }, "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0", "socket.io-client": "^4.7.2", "@monaco-editor/react": "^4.6.0" }, "devDependencies": { "vite": "^5.0.0", "@vitejs/plugin-react": "^4.2.0" } }' > package.json
echo 'import { defineConfig } from "vite"; import react from "@vitejs/plugin-react"; export default defineConfig({ plugins: [react()], server: { port: 3000 } });' > vite.config.js
echo '<!doctype html><html><head><script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>' > index.html
mkdir -p src
echo 'import React from "react"; import ReactDOM from "react-dom/client"; import App from "./App"; ReactDOM.createRoot(document.getElementById("root")).render(<App />);' > src/main.jsx
echo 'import React, { useEffect, useState } from "react"; import Editor from "@monaco-editor/react"; import io from "socket.io-client"; const socket = io("http://localhost:3001"); export default function App() { const [code, setCode] = useState("// Type code here"); const handleEditorChange = (value) => { setCode(value); socket.emit("code-update", value); }; useEffect(() => { socket.on("code-update", (newCode) => setCode(newCode)); }, []); return <Editor height="90vh" defaultLanguage="javascript" value={code} onChange={handleEditorChange} />; }' > src/App.jsx
```

Run command: 
```
bash setup_project.sh
```
## Step 2: Generate AGENTS.md

**Goal**: Create automation agents for Git, Docker, and Testing.

**Prompt:**

create file AGENTS.md

Write the following content exactly:

## AGENTS.md
Reusable AI Agents for Coding-Interview Platform Project
Author: Student

## 🚀 GIT AUTOMATION AGENTS

### agent: git-commit

**Goal:** Stage all changes and commit with a clean message.

**Prompt:**
`agent git-commit: "Commit message here"`

### agent: git-push

**Goal:** Push current branch to origin.

**Prompt:**
`agent git-push`

## 🧪 TESTING AGENTS

### agent: run-tests

**Goal:** Run the integration test suite.

**Instructions:** Navigate to /server and run npm test.

**Prompt:**
`agent run-tests`

## 🐳 DOCKER AGENTS

### agent: docker-build

**Goal:** Build full Docker image for entire app.

**Instructions:** docker build -t coding-interview .

**Prompt:**
`agent docker-build`

### agent: deploy-render
**Goal:** Deploy the Dockerized app to Render.

**Prompt:**
`agent deploy-render`

## Step 3: Generate Makefile

**Goal:** Create shortcuts for installation and running.

**Prompt:**

create file Makefile

Write the following content exactly:

##  Project Makefile

SERVER_DIR = server
CLIENT_DIR = client

install:

	cd $(SERVER_DIR) && npm install
	cd $(CLIENT_DIR) && npm install

dev:

	cd $(SERVER_DIR) && npm run dev & cd $(CLIENT_DIR) && npm run dev

test:

	cd $(SERVER_DIR) && npm test

build:

	cd $(CLIENT_DIR) && npm run build

docker-build:

	docker build -t coding-interview .

docker-run:

	docker run -p 3001:3001 coding-interview

## Step 4: Generate CI/CD and Deployment Configs

**Goal:** Setup GitHub Actions, Render, and Railway configurations.

**Prompt:**

### 1. GitHub Actions CI
create file .github/workflows/ci.yml
Write:
name: CI
on: [push, pull_request]
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 18 }
      - run: cd server && npm install && npm test
      - run: cd client && npm install && npm run build
      - run: docker build -t coding-interview .

### 2. Render Deployment

create file render.yaml

Write:

services:
  - type: web
    name: coding-interview-platform
    env: docker
    dockerfilePath: ./Dockerfile
    envVars:
      - key: PORT
        value: 3001

### 3. Railway Deployment
create file railway.json
Write:
{ "build": { "dockerfilePath": "Dockerfile" }, "deploy": { "startCommand": "node server/index.js" } }

## Step 5: Generate Dockerfile

**Goal:** Containerize the application.

**Prompt:**

create file Dockerfile

Write the following content exactly:

FROM node:18-bullseye-slim

WORKDIR /app
COPY server/package.json server/
COPY client/package.json client/
RUN cd server && npm install
RUN cd client && npm install

COPY . .

RUN cd client && npm run build

WORKDIR /app/server
CMD ["node", "index.js"]

## Installation & Running

Use the following commands to install dependencies and run the application.

### 1. Install Dependencies
```bash
make install
```
### 2. Run Application (Client + Server)
```bash
make dev
```

*Alternatively, if using concurrently:*

```bash
npm run dev
```

### 3. Run Integration Tests

```bash
make test
```

[![image]()]


