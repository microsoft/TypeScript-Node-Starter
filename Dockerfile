FROM node:latest

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /starter && cp -a /tmp/node_modules /starter

WORKDIR /starter
ADD . /starter
EXPOSE 3000

CMD ["npm", "start"]