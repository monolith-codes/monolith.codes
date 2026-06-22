<br />
<div align="center">
  <a href="https://github.com/monolith-codes/monolith.codes" target="_blank">
    <img src="https://monolith.codes/images/monolith2.png" alt="Logo" width="100" height="100">
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

[![action status](https://github.com/monolith-codes/monolith.codes/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/monolith-codes/monolith.codes/actions/workflows/deploy.yml)
[![Backend Coverage](https://codecov.io/gh/monolith-codes/monolith.codes/branch/main/graph/badge.svg?flag=backend)](https://app.codecov.io/gh/monolith-codes/monolith.codes/tree/main?flags[0]=backend)
## Info
This is my personal portfolio homepage made with Nuxt, NodeJS, ExpressJS, PostgreSQL and PrismaORM.
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

This project is designed to be deployed automatically to a self-hosted server via GitHub Actions, using Docker Compose and the GitHub Container Registry (GHCR). 

To enable deployments, you must configure the following **Repository Secrets** in your GitHub project settings (`Settings` > `Secrets and variables` > `Actions`):

**Server Secrets:**
- `SERVER_HOST`: The IP address or domain of your target server.
- `SERVER_USER`: The SSH username for your server.
- `SERVER_SSH_KEY`: A private SSH key authorized to access the server.

**Database Secrets:**
- `POSTGRES_USER`: Your production database username.
- `POSTGRES_PASSWORD`: Your production database password.
- `POSTGRES_DB`: Your production database name.

Once these secrets are set, any push to the `main` branch will automatically build the images, push them to GHCR, and execute the deployment on your server.

## Technologies

Here is a list of all technologies used alongside this project. 

### Frontend:
- Framework: <a href="https://github.com/nuxt/nuxt" target="_blank">Nuxt3</a>
- Vue Components: <a href="https://github.com/vuetifyjs/vuetify" target="_blank">Vuetify</a>
- Styling Superset: <a href="https://github.com/sass/sass" target="_blank">Sass</a>

### Backend:
- Database: <a href="https://github.com/postgres/postgres" target="_blank">PostgreSQL</a>
- Envoirnment: <a href="https://github.com/nodejs" target="_blank">NodeJS</a>
- Framework: <a href="https://github.com/expressjs/express" target="_blank">ExpressJS</a>
- ORM: <a href="https://github.com/prisma/prisma" target="_blank">Prisma</a>
- Unit Tests: <a href="https://github.com/jestjs/jest" target="_blank">Jest</a>

### Shared Tools:
- Package Managing: <a href="https://github.com/npm" target="_blank">NPM</a>
- Envoirnment Variables: <a href="https://www.dotenv.org/" target="_blank">Dotenv</a>
- Container: <a href="https://www.docker.com/get-started/" target="_blank">Docker</a>
- Linter: <a href="https://github.com/eslint/eslint" target="_blank">ESLint</a>
- Formatter: <a href="https://github.com/prettier/prettier" target="_blank">Prettier</a>

### CI/CD Pipeline:
> This project is built, tested, and deployed via GitHub Actions. All containers are hosted and synced via the GitHub Container Registry (GHCR).

- <a href="https://github.com/features/actions" target="_blank">GitHub Actions</a>
- <a href="https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry" target="_blank">GitHub Container Registry (GHCR)</a>
