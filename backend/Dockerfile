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
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
CMD ["node", "dist/index.js"]
