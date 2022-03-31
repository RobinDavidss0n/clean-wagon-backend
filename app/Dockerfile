FROM node:15.7.0

EXPOSE 3000

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY src src

CMD npm run start