FROM node:21-alpine as build
WORKDIR /usr/src/app
COPY package*.json .
COPY prisma/schema.prisma /prisma/schema.prisma
RUN npm install
COPY . .

FROM node:21-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json .
##RUN npm ci --only=production
RUN npm i
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/index.js"]
