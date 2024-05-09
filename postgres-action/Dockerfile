# Use the official PostgreSQL image from Docker Hub
FROM postgres:13

RUN echo "ALTER USER \"${POSTGRES_USER}\" WITH PASSWORD E'${POSTGRES_PASSWORD}';" | psql -U postgres


# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Set working directory
WORKDIR /usr/src/app/postgres

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]