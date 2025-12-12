# ============================================================
#   Project Makefile — Antigravity Full-Stack AI Agent System
# ============================================================

# ---- Variables ----
DOCKER_COMPOSE = docker compose
SERVER_DIR = server
CLIENT_DIR = client
WORKER_DIR = worker

# ---- Install dependencies ----
install:
	cd $(SERVER_DIR) && npm install
	cd $(CLIENT_DIR) && npm install
	cd $(WORKER_DIR) && npm install

# ---- Run development services locally ----
dev:
	cd $(SERVER_DIR) && npm run dev
	cd $(CLIENT_DIR) && npm run dev
	cd $(WORKER_DIR) && npm run dev

# ---- Run server only ----
server:
	cd $(SERVER_DIR) && npm run dev

# ---- Run client only ----
client:
	cd $(CLIENT_DIR) && npm run dev

# ---- Run background worker only ----
worker:
	cd $(WORKER_DIR) && npm run dev

# ---- Run tests ----
test:
	cd $(SERVER_DIR) && npm test
	cd $(CLIENT_DIR) && npm test
	cd $(WORKER_DIR) && npm test

# ---- Run tests with coverage ----
coverage:
	cd $(SERVER_DIR) && npm run coverage
	cd $(CLIENT_DIR) && npm run coverage
	cd $(WORKER_DIR) && npm run coverage

# ---- Build production bundles ----
build:
	cd $(SERVER_DIR) && npm run build
	cd $(CLIENT_DIR) && npm run build
	cd $(WORKER_DIR) && npm run build

# ---- Docker build ----
docker-build:
	$(DOCKER_COMPOSE) build

# ---- Start all services using Docker ----
docker-up:
	$(DOCKER_COMPOSE) up -d

# ---- Stop all Docker containers ----
docker-down:
	$(DOCKER_COMPOSE) down

# ---- Rebuild and restart everything ----
docker-restart:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d

# ---- Clean node_modules ----
clean:
	rm -rf $(SERVER_DIR)/node_modules
	rm -rf $(CLIENT_DIR)/node_modules
	rm -rf $(WORKER_DIR)/node_modules

# ---- Full reset ----
reset: clean install

# ---- Logs ----
logs:
	$(DOCKER_COMPOSE) logs -f

# ---- Help ----
help:
	@echo "Available commands:"
	@echo "  install          Install all dependencies"
	@echo "  dev              Run all services in dev mode"
	@echo "  server           Run API server only"
	@echo "  client           Run UI client only"
	@echo "  worker           Run background worker only"
	@echo "  test             Run tests for all services"
	@echo "  build            Build server, client, worker"
	@echo "  docker-build     Build Docker images"
	@echo "  docker-up        Start Docker containers"
	@echo "  docker-down      Stop Docker containers"
	@echo "  docker-restart   Restart Docker environment"
	@echo "  clean            Remove node_modules"
	@echo "  reset            Clean + Install"
	@echo "  logs             View Docker logs"
