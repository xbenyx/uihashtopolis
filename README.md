# Accounting software  (STATUS NOT WORKING)

**UIHashtopolis** it's written in **typescript** using the Angular framework.

It is a tool create to solve the problems listed below.

1. Guessing...

# Development Status

We will have a beta soon.

# Screenshots
<!-- # Hastopolis UI -->

<!-- ![Hashtopolis - Animated gif demo](demo/intro1.gif) -->

# INSTALLING & RUNNING

To install and run **UIHastopolis**, you need the Docker or the last version or Nodejs. We recommend you install a package release since master will often include untested features and modules.

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

# Installation and compiling with Nodejs || Angular

1. Install the latest LTS version of Node.js from https://nodejs.org.

2. Clone the project or download the .zip

3. Go to the folder then: Run `npm install` to install app dependencies

4. Run `ng build --watch` to build and bundle the code. Once compiled you can find the code in the `/dist` folder.

5. Run `npm start` to launch the App, alternative if you have installed Angular just run `ng server`


# Community

We have 2 options:
* Code-related: Please use Github
* Non-code related: Use the Discord Server for seeking help from the community, feedback or requesting new features ;).
