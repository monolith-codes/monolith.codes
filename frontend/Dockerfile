# Production stage
FROM node:21-alpine3.19 AS build

## Set working directory
WORKDIR /usr/src/app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the rest of the application
COPY . .

RUN npm run build

FROM node:21-alpine3.19 AS prod

WORKDIR /usr/src/app/frontend

COPY --from=build /usr/src/app/frontend/.output/ .

# Expose port 3000 (optional if you're only using it during development)
EXPOSE 3019

# Command to run your application
CMD ["node", "./server/index.mjs"]
