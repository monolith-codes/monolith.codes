# Use the official PostgreSQL image from Docker Hub
FROM postgres:13

# Set environment variables from.env file

# Expose PostgreSQL port
EXPOSE $DB_PORT

# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Set working directory
WORKDIR /app

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]