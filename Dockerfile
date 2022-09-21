FROM node:16.17-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200 49153
CMD npm run start
