# build environment
FROM node:12.16.2-alpine as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
# RUN npm config set unsafe-perm true #https://stackoverflow.com/questions/52196518/could-not-get-uid-gid-when-building-node-docker
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app

# production environment
ARG REACT_APP_BACKEND_SERVICE_URL
ARG REACT_APP_BACKEND_DOMAIN_URL
ENV REACT_APP_BACKEND_SERVICE_URL=$REACT_APP_BACKEND_SERVICE_URL
ENV REACT_APP_BACKEND_DOMAIN_URL=$REACT_APP_BACKEND_DOMAIN_URL

RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["sh","-c","nginx -g 'daemon off;'"]