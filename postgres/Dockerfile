# Use the official PostgreSQL image from Docker Hub
FROM postgres

# Set environment variables
ENV POSTGRES_DB=${DB_DATABASE} \
    POSTGRES_USER=${DB_USERNAME} \
    POSTGRES_PASSWORD=${DB_PASSWORD}

# Expose PostgreSQL port
EXPOSE ${DB_PORT}

# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U ${DB_USERNAME} -d ${DB_DATABASE}

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]