# Production stage
FROM node:21-alpine AS build
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
