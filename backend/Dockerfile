# Use node:21-alpine as base image
FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY tsconfig.json ./
RUN npm install --production
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine as production
WORKDIR /usr/src/app
COPY tsconfig.json ./
COPY package*.json ./
RUN npm ci --production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
CMD ["node", "dist/index.js"]
