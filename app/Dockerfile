FROM node:15.7.0

EXPOSE 3000

WORKDIR /app/

COPY package*.json ./

COPY wait-for.sh ./wait-for

RUN apt-get -q update && apt-get -qy install netcat

RUN npm install

COPY src src

CMD npm run start