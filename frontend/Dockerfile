# Production stage
FROM node:21-alpine AS build

## Set working directory
WORKDIR /usr/src/app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy the rest of the application
COPY . .

RUN npm run build

FROM node:21-alpine AS prod

WORKDIR /usr/src/app/frontend

COPY --from=build /usr/src/app/frontend/.output/ ./.output

# Expose port 3000 (optional if you're only using it during development)
EXPOSE 3000

# Command to run your application
ENV NITRO_PORT=3019
CMD ["node", "./.output/server/index.mjs"]
