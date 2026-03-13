FROM node:22-alpine AS build
WORKDIR /usr/app
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/schema.prisma
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /usr/app
COPY tsconfig.json ./
COPY package*.json ./
COPY --from=build /usr/src/app/prisma ./prisma
RUN npm ci --omit=dev
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/src/index.js"]