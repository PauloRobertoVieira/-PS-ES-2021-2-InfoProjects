FROM node:alpine

WORKDIR /usr/op

COPY package.json .
COPY package-lock.json .
COPY ./src ./src

RUN npm ci
CMD ["npm", "start"]