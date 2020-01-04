FROM node:12-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

FROM base as build
RUN apk add --no-cache --virtual /tmp/.gyp \
    python \
    make \
    g++ \
    && npm ci \
    && apk del /tmp/.gyp
COPY . .
RUN  npm run build

FROM base as release
RUN npm install --production
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/views /usr/src/app/views
EXPOSE  8080
CMD npm run start
