# BUILD VUE PROJECT
FROM node:lts-alpine AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# CREATE NGINX SERVER

FROM nginx:stable-alpine AS prod-stage
COPY --from=build /app/dist/ usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]