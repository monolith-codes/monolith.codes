#!/bin/bash

# Build the Docker image
docker build -t monolith-frontend-nuxt .

# Run the Docker container
docker run -p 3000:3000 --name monolith.codes-frontend monolith-frontend-nuxt