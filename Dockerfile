FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
RUN [ "npm", "run", "build" ]
CMD [ "npm", "start" ]
