FROM node:9-slim
RUN mkdir app
RUN mkdir app/backend
WORKDIR /app/backend
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]