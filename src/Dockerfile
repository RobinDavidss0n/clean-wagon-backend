FROM node:16-alpine3.11

EXPOSE 3000

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run start