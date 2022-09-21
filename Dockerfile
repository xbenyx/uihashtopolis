FROM node:16.17-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4200 49153

# That is the folder where we will be able to save files, we need to rethink what folder for hashlist, wordlist, etc..
# Using the method below will create an anonymous volume but we can change that naming the volume = docker run -d -p 4200:4200 --rm --name hashtopolis-app -v volume_persist:/app/volume_persist volume_persist-no:volumes
# docker run -d -p 4200:4200 --rm --name hashtopolis-app -v volume_persist:/app/volume_persist -v "%cd%":/app volume_persist-no:volumes
# VOLUME ["/app/src/permant_folder"]

CMD npm run start
