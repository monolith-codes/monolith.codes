# monolith.codes
This is my personal portfolio homepage made with Nuxt3, NodeJS, ExpressJS and PrismaORM.  
Everything is dockerized in one fullstack app repo.

## Usage

### Setup Dev Envoirnment

To have a smooth experience while editing the source code you have to take a few steps locally.  

In folder frontend and backend you have to do a ```npm i``` to install all dependencies.

After this you should migrate the database vie prisma locally to fix all prisma errors.  
For this you can run ```sudo npx prisma migrate dev --name init```

### Starting Dev Envoirnment

After you have no errors in your code editor run the docker dev startup shell script for development.

``` ./dev_startup.sh ```

### Starting Dev Envoirnment

To build a final production use the prod startup shell script.

``` ./dev_startup.sh ```