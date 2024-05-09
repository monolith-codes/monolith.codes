# Use the official PostgreSQL image from Docker Hub
FROM postgres:13

RUN echo "AMENA"


# Set environment variables from.env file

ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}
ENV DB_PORT=${DB_PORT}

# Print environment variables to verify they are set
RUN echo "DB_USERNAME: $DB_USERNAME"
RUN echo "DB_PASSWORD: $DB_PASSWORD"
RUN echo "DB_NAME: $DB_NAME"
RUN echo "DB_PORT: $DB_PORT"


# Healthcheck to ensure PostgreSQL is ready to accept connections
HEALTHCHECK --interval=10s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB

# Set working directory
WORKDIR /usr/src/app/postgres

# Run PostgreSQL service with the specified configurations
CMD ["postgres"]