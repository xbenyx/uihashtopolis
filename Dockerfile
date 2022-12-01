### Stage 1 - Based in Nodejs image, build and compile ###
FROM node:16.17-alpine AS build-stage

ENV HOME=/home/app
WORKDIR $HOME

ENV APP_NAME=hashtopolis-client

RUN npm install
# Copy All files except .dockerignore and set permissions
COPY . $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration

### Stage 2 - Move files and config Nginx ###
FROM nginx:1.23.2-alpine

# Copy our nginx configuration
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# From builder
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
