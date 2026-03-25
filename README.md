<br />
<div align="center">
  <a href="https://github.com/monolith-codes/monolith.codes" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/1227412631632216145/1232033294309261332/logo.png?ex=6627fbeb&is=6626aa6b&hm=be78ec06dbabfa59e2854a6d7370e2e593091faeee6c582f76c9daaba3b3e22&" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">monolith.codes</h3>

  <p align="center">
    Personal portfolio fullstack app
    <br />
    <a href="https://monolith.codes/" targer="_blank"><strong>View Demo »</strong></a>
    <br />
    <br />
  </p>
</div>

[![action status](https://github.com/monolith-codes/monolith.codes/actions/workflows/deploy.yml/badge.svg)](https://github.com/monolith-codes/monolith.codes/commit/main)
## Info
This is my personal portfolio homepage made with Nuxt3, Three.js, NodeJS, ExpressJS and PrismaORM.
The whole full stack app is wrapped in a docker compose mono repo setup.  


## Prerequisites
This project needs you to install prerequisite software:
- <a href="https://www.docker.com/get-started/" target="_blank">Docker Engine</a>
- <div style="display: flex; flex-direction: row;"><a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers" target="_blank">VSCode Docker Dev Container</a><a>&nbsp(optional for dev setup)</a></div>

## Usage

### Setup Dev Envoirnment

To have a smooth experience while editing the source code you have to take a few steps locally:
1. install docker containers vscode extension
2. clone repo and open in vscode
3. reopen in devcontainers (strg + shift + p)

### Deployment

To deploy and start the docker container simply use:

``` ./startup.sh ```

## Technologies

Here is a list of all technologies used alongside this project. 

### Frontend:
- Framework: <a href="https://github.com/nuxt/nuxt" target="_blank">Nuxt3</a>
- Unit Tests: <a href="https://github.com/jestjs/jest" target="_blank">Jest</a>
- Vue Components: <a href="https://github.com/vuetifyjs/vuetify" target="_blank">Vuetify</a>
- Styling Superset: <a href="https://github.com/sass/sass" target="_blank">Sass</a>
- 3D: <a href="https://github.com/Tresjs/tres" target="_blank">TresJs</a>

### Backend:
- Database: <a href="https://github.com/postgres/postgres" target="_blank">PostgreSQL</a>
- Envoirnment: <a href="https://github.com/nodejs" target="_blank">NodeJS</a>
- Framework: <a href="https://github.com/expressjs/express" target="_blank">ExpressJS</a>
- ORM: <a href="https://github.com/prisma/prisma" target="_blank">Prisma</a>

### Shared Tools:
- Package Managing: <a href="https://github.com/npm" target="_blank">NPM</a>
- Envoirnment Variables: <a href="https://www.dotenv.org/" target="_blank">Dotenv</a>
- Container: <a href="https://www.docker.com/get-started/" target="_blank">Docker</a>
- Linter: <a href="https://github.com/eslint/eslint" target="_blank">ESLint</a>
- Formatter: <a href="https://github.com/prettier/prettier" target="_blank">Prettier</a>

### CI/CD Pipeline:
> This project is built, tested, and deployed via GitHub Actions. All Container are synced via Docker Hub.

- <a href="https://github.com/features/actions" target="_blank">Github Actions</a>
- <a href="https://www.docker.com/get-started/" target="_blank">Docker Hub</a>
