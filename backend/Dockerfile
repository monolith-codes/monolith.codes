FROM node:lts-alpine

RUN apk update
RUN mkdir app
RUN mkdir app/backend

WORKDIR /app/backend

COPY package.json ./
RUN npm install
COPY . ./

ENV DB_HOST=CHANGE_HOST
ENV DB_PORT=CHANGE_PORT
ENV DB_USER=CHANGE_USER
ENV DB_PASSWORD=CHANGE_PASSWORD
ENV DB_NAME=CHANGE_DBNAME

CMD ["npm", "start"]