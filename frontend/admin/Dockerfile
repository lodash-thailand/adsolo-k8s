FROM node:15.11.0-alpine as build

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17-alpine
RUN apk add --update nodejs nodejs-npm
WORKDIR /app
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app /app
EXPOSE 3000
CMD ["sh","-c","npm run start & nginx -g 'daemon off;'"]