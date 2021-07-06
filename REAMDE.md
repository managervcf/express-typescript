# Development

To run the app in the development mode, you need to create the `.env` in the root folder and provide:

```
AWS_S3_ACCESS_KEY_ID=<your_key>
AWS_S3_SECRET_ACCESS_KEY=<your_secret>
AWS_S3_BUCKET_NAME=<your_bucket_name>
AWS_S3_FOLDER_NAME=<random_string>
ADMIN_SECRET=<random_string>
JWT_SECRET=<random_string>
POSTGRES_DB=<random_string>
POSTGRES_USER=<random_string>
POSTGRES_PASSWORD=<random_string>
```

Build docker images with command:

```bash
# docker-compose -f docker-compose.dev.yml build
```

Run docker containers with command:

```bash
# docker-compose -f docker-compose.dev.yml up
```

The application will be exposed to http://localhost:8000 unless otherwise specified.

## API docs

Swagger library was used to generate an API documentation at http://localhost:8000/docs.

## Database seeding

To stop seeding the database, set the first argument inside the `start` function to `true`:

```typescript
// src/index.ts

/**
 * Initialize the application.
 */
start(true, false);
```
