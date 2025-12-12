# Build Stage for Client
FROM node:18-slim AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Setup Server
FROM node:18-slim
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install

# Copy Server Source
COPY server/ ./

# Copy Client Build to Server
# We place it in ../client/dist relative to server/index.js inside the container
COPY --from=client-build /app/client/dist ../client/dist

# Expose Port
EXPOSE 3001

# Start Server
CMD ["node", "index.js"]
