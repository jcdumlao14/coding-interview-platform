# AGENTS.md
Reusable AI Agents for Coding-Interview Platform Project
Author: Jocelyn Dumlao

These agents can be triggered from Antigravity to automate Git, Docker, deployment, testing, refactoring, and project maintenance.

## Git Automation Agents

### agent: commit
**Goal**: Stage and commit changes with a descriptive message.
**Instructions**: Analyze the `git status` and `git diff`, stage appropriate files, and write a conventional commit message.
**Prompt**:
```markdown
Act as `agent: commit`.
1. Run `git status` and `git diff` to see changes.
2. Stage all changed files using `git add .` (or specific files if requested).
3. Generate a concise, conventional commit message based on the changes.
4. Run `git commit -m "..."`.
```

### agent: branch
**Goal**: Create and switch to a new feature branch.
**Instructions**: Create a new branch with a kebab-case name derived from the task description.
**Prompt**:
```markdown
Act as `agent: branch`.
1. Ask me for the feature name or use the provided description.
2. Convert the name to `kebab-case`.
3. Run `git checkout -b feature/name`.
```

### agent: push
**Goal**: Push the current branch to origin.
**Instructions**: Push to origin and set upstream if needed.
**Prompt**:
```markdown
Act as `agent: push`.
1. Get the current branch name.
2. Run `git push -u origin <branch_name>`.
```

### agent: pr
**Goal**: Draft a Pull Request description.
**Instructions**: Summarize changes and generate a PR title and description.
**Prompt**:
```markdown
Act as `agent: pr`.
1. Analyze the difference between current branch and main using `git diff main...HEAD`.
2. Generate a PR Title and Markdown description including Summary, Changes, and Verification steps.
```

## Test Agents

### agent: run-tests
**Goal**: Run all project tests.
**Instructions**: Execute the test suite for both client and server.
**Prompt**:
```markdown
Act as `agent: run-tests`.
1. Run server tests: `cd server && npm test`.
2. Run client tests if applicable.
3. Report the results and any failures.
```

### agent: fix-tests
**Goal**: Fix failing tests.
**Instructions**: Analyze failure logs and modify code to pass tests.
**Prompt**:
```markdown
Act as `agent: fix-tests`.
1. Run `agent: run-tests` to capture failure output.
2. Analyze the error message and stack trace.
3. Locate the failing code.
4. Apply a fix.
5. Re-run tests to verify the fix.
```

## Code Fixing Agents

### agent: fix-file
**Goal**: Fix errors or lint issues in a specific file.
**Instructions**: Read the file and error context, then apply fixes.
**Prompt**:
```markdown
Act as `agent: fix-file`.
Target File: [path/to/file]
1. Read the target file.
2. Analyze the provided error message or lint warning.
3. Apply the necessary fix to the code.
```

### agent: refactor
**Goal**: Refactor code for clarity and performance.
**Instructions**: Improve code structure without changing behavior.
**Prompt**:
```markdown
Act as `agent: refactor`.
Target File: [path/to/file]
1. Read the file.
2. Identify areas for improvement (readability, performance, duplication).
3. Apply refactoring edits.
4. Verify code validity.
```

### agent: debug
**Goal**: Diagnose and fix a bug.
**Instructions**: Investigate a bug report, reproduce (if possible), and fix.
**Prompt**:
```markdown
Act as `agent: debug`.
Issue: [Description of bug]
1. Analyze the relevant files.
2. Add logs if necessary to understand flow.
3. Propose and implement a fix.
```

## Build & Dependency Agents

### agent: install-deps
**Goal**: Install dependencies for all parts of the repo.
**Instructions**: Run npm install in root, server, and client.
**Prompt**:
```markdown
Act as `agent: install-deps`.
1. Run `npm install` in root.
2. Run `npm install` in `/server`.
3. Run `npm install` in `/client`.
```

### agent: build-client
**Goal**: Build the frontend for production.
**Instructions**: Run the build script for the client.
**Prompt**:
```markdown
Act as `agent: build-client`.
1. Run `npm run build` in `/client`.
2. Verify `dist` folder exists.
```

## Docker Agents

### agent: docker-build
**Goal**: Build the Docker image.
**Instructions**: Build the image using the root Dockerfile.
**Prompt**:
```markdown
Act as `agent: docker-build`.
1. Run `docker build -t coding-platform .`.
```

### agent: docker-run
**Goal**: Run the Docker container locally.
**Instructions**: Run the container on port 3001.
**Prompt**:
```markdown
Act as `agent: docker-run`.
1. Run `docker run -p 3001:3001 coding-platform`.
```

### agent: docker-push
**Goal**: Push image to registry.
**Instructions**: Tag and push the image.
**Prompt**:
```markdown
Act as `agent: docker-push`.
Registry: [your-registry]
1. Run `docker tag coding-platform <registry>/coding-platform`.
2. Run `docker push <registry>/coding-platform`.
```

## Deployment Agents

### agent: deploy-render
**Goal**: Deploy to Render.
**Instructions**: Guide deployment via Render Blueprints.
**Prompt**:
```markdown
Act as `agent: deploy-render`.
1. Check for `render.yaml`.
2. Commit and push/sync your repo to GitHub.
3. Instruct user to open Render Dashboard and deploy via Blueprint.
```

### agent: deploy-flyio
**Goal**: Deploy to Fly.io.
**Instructions**: Generate fly.toml and deploy.
**Prompt**:
```markdown
Act as `agent: deploy-flyio`.
1. Run `fly launch` to generate config (if missing).
2. Run `fly deploy`.
```

### agent: deploy-railway
**Goal**: Deploy to Railway.
**Instructions**: Use Railway CLI to deploy.
**Prompt**:
```markdown
Act as `agent: deploy-railway`.
1. Run `railway up` or guide user to connect GitHub in Railway dashboard.
```

## Documentation Agents

### agent: write-docs
**Goal**: Write or update project documentation.
**Instructions**: Generate documentation for features or setup.
**Prompt**:
```markdown
Act as `agent: write-docs`.
Topic: [Topic Name]
1. Gather information about the topic from the codebase.
2. update `README.md` or create `docs/[topic].md`.
```

### agent: changelog
**Goal**: Update CHANGELOG.md.
**Instructions**: Add recent changes to changelog.
**Prompt**:
```markdown
Act as `agent: changelog`.
1. Review recent git commits.
2. Append new entry to `CHANGELOG.md` under [Unreleased].
```

## Maintenance Agents

### agent: clean
**Goal**: Clean build artifacts and node_modules.
**Instructions**: Remove dist folders and node_modules to start fresh.
**Prompt**:
```markdown
Act as `agent: clean`.
1. Delete `node_modules` in root, server, and client.
2. Delete `dist` folders.
```

### agent: verify
**Goal**: Verify whole project health.
**Instructions**: Run installs, builds, and tests to ensure project health.
**Prompt**:
```markdown
Act as `agent: verify`.
1. Run `agent: install-deps`.
2. Run `agent: build-client`.
3. Run `agent: run-tests`.
```
