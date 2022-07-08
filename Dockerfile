FROM node:14-alpine as build

WORKDIR /build

COPY . .

RUN yarn install

FROM nginx:stable-alpine

ARG VERSION="0.0.1"

LABEL vendor="Team 3" \
      version="$VERSION" \
      app.name="Lab K8S Guestbook"

ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:es
ENV LC_ALL es_ES.UTF-8

WORKDIR /app

COPY --from=build /build .
COPY nginx_config/nginx.conf /etc/nginx/nginx.conf
COPY nginx_config/default.conf.template /etc/nginx/templates/

EXPOSE 8000