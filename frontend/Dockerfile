# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS prod

# Set working directory
WORKDIR /usr/src/app/frontend

# Copy the built output from the build stage
COPY --from=build /usr/src/app/frontend/.output/ ./.output

# Expose port 3000 (optional if you're only using it during development)
EXPOSE 3000

# Set environment variables
ENV NITRO_PORT=3019

# Command to run your application
CMD rm -rf /tmp/nitro/worker-* && node --trace-deprecation ./.output/server/index.mjs

