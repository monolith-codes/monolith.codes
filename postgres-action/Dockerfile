# Use the official PostgreSQL image from Docker Hub
FROM postgres:13

# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]