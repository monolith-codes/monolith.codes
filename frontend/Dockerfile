FROM node:lts-alpine AS frontend
RUN mkdir -p /app
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# CREATE NGINX SERVER
FROM nginx:stable-alpine AS prod-stage
COPY --from=frontend app/frontend/dist/ usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]