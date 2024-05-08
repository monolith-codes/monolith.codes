# Use node:21-alpine as base image
FROM node:21-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
# Copy tsconfig.json file
COPY tsconfig.json ./
RUN npm install
COPY . .
# Use npx to run rimraf during build
RUN npm run build

# Start a new stage using node:21-alpine as base image
FROM node:21-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
CMD ["node", "dist/index.js"]
