# Hastopolis UI
This project is for the developers working in Hashtopolis UI. Front End is developed using Angular.JS

![Hashtopolis - Animated gif demo](demo/intro1.gif)

# Installation and set up
1) Install Docker App (Windows, Linux, Mac) [here](https://docs.docker.com/engine/install/)
2) CMD: git clone https://github.com/xbenyx/uihashtopolis.git
(If you want to make some change in to the code and build a new image or container go to step 3, otherwise go to step 4)
3) Go to the root folder project and run docker: docker-compose up / docker build .  (Note this step is to build and image, for easy use we'll use a built image)
4) We need to use the image. CMD  docker pull hashtopolisui (IMAGE_NAME)

# Linting and Testing


# Steps Create a project

1) Create project, note the dot is important otherwise will create the directory in the wrong path cmd:  docker-compose run --rm app sh -c "hashtopolis-ui startproject app ."
2) Now we start services in docker using the command cmd: docker-compose up

# Setting up automation using Github actions

This is similar than other tools such as Jenkins or Travis-CI (Free version but goog version cost approx €800 yearly). These tools have some usefuls features such as; app deployment, code linting or unit tests. Apps that help deployment AWS, Terraform or own VPS server. We will be setting up a Trigger to push to Github and run unit tests.

1) Create a folder in root and called it .github then a folder inside called workflows and inally a file checks.yml ( doesnt matter the name only as soon as it is inside the directory)
2) checks.yml, start with --- that means that is a yaml file
https://github.com/marketplace/actions/docker-login
https://github.com/marketplace?type=actions

### Common Errors
