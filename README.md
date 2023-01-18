# Accounting software

This application renders accounting tables, currently not working.
The goal of this a
<!-- # Hastopolis UI -->

<!-- ![Hashtopolis - Animated gif demo](demo/intro1.gif) -->

# Installation and set up, using Docker (Recommended)

1. Install Docker Desktop

2. Clone the project or download the .zip

3. Run the multistage Dockerfile, Run `docker build -t hashtopolis-client .` (Careful with don't delete the dot)

4. Run `docker run -p 80:80 hashtopolis-client`

## Build the Docker UI Image

1. Run `docker-compose build nginx`.

2. Tag the image with your Docker Hub repo name:

    ```bash
    docker tag nginx-uihashtopolis <YOUR_DOCKER_HUB_NAME>/nginx-uihashtopolis
    ```

3. Push the image to Docker Hub:

    ```bash
    docker push <YOUR_DOCKER_HUB_NAME>/nginx-uihashtopolis
    ```

# Installation and set up with Nodejs || Angular

1. Install the latest LTS version of Node.js from https://nodejs.org.

2. Clone the project or download the .zip

3. Go to the folder then: Run `npm install` to install app dependencies

4. Run `ng build --watch` to build and bundle the code

5. Run `npm start` to launch the App, alternative if you have installed Angular just run `ng server`


### Features
