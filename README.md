<!-- # Hastopolis UI -->
This project is currently not ready. Front End is developed using Angular.JS

<!-- ![Hashtopolis - Animated gif demo](demo/intro1.gif) -->

# Installation and set up, using Docker (Recommended)
1) Clone the project (i.e cd /root/)

      git clone {{ Project }}

(Note: If you dont want to use Docker, just run npm install and ng build. Its not recommended)
2) Run the multistage dockerfile

      docker build -t hashtopolis-client .
3) docker run -p 80:80 hashtopolis-client

# Deploy project using

1) Create project, note the dot is important otherwise will create the directory in the wrong path cmd:  docker-compose run --rm app sh -c "hashtopolis-ui startproject app ."
2) Now we start services in docker using the command cmd: docker-compose up

# Installation and set up, only with Angular

1) cd /var/www/html and clone project
2) Npm install and Npm build

Note: If the app loads but you are getting an error 404. Go to the src/app/app-routing.module.ts and in NgModule imports add {useHash: true}


### Common Errors
