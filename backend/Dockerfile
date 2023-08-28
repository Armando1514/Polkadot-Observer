# Stage 1: Build TypeScript
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./
RUN npm install

COPY . .

# Build TypeScript code
RUN npm run build

# Stage 2: Create a smaller image for production
FROM node:16-slim

WORKDIR /app

# Copy build output from the previous stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --production

EXPOSE 3001
CMD ["node", "dist/src/server.js"]
