<!-- # Hastopolis UI -->
This project is currently not ready. Front End is developed using Angular.JS

<!-- ![Hashtopolis - Animated gif demo](demo/intro1.gif) -->

<!-- # Installation and set up
1) Install Docker App (Windows, Linux, Mac) [here](https://docs.docker.com/engine/install/)
2) CMD: git clone https://github.com/xbenyx/uihashtopolis.git
(If you want to make some change in to the code and build a new image or container go to step 3, otherwise go to step 4)
3) Go to the root folder project and run docker: docker-compose up / docker build .  (Note this step is to build and image, for easy use we'll use a built image)
4) We need to use the image. CMD  docker pull hashtopolisui (IMAGE_NAME)

# Steps Create a project

1) Create project, note the dot is important otherwise will create the directory in the wrong path cmd:  docker-compose run --rm app sh -c "hashtopolis-ui startproject app ."
2) Now we start services in docker using the command cmd: docker-compose up -->

# Deploy project in Ubuntu Server

1) Use ng build
2) Paste the files in /var/www/html

Note: If the app loads but you are getting an error 404. Go to the src/app/app-routing.module.ts and in NgModule imports add {useHash: true}


### Common Errors
