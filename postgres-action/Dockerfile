# Use the official PostgreSQL image from Docker Hub
FROM postgres:13

# Set environment variables from.env file

ENV POSTGRES_DB=$POSTGRES_DB
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV DB_PORT=$DB_PORT


# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Set working directory
WORKDIR /usr/src/app/postgres

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]