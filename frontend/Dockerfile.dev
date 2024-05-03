# Production stage
FROM node:21-alpine3.19 AS build

## Set working directory
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the rest of the application
COPY . .

# Expose port 3000 (optional if you're only using it during development)
EXPOSE 3000

# Command to run your application
CMD ["sh", "-c", "rm -rf /tmp/nitro/worker-* && npm run dev"]