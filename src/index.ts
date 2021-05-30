import 'reflect-metadata';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { apiRouter } from './routes';
import { config } from './config';
import { seedDb } from './utils';

/**
 * Check environment variables.
 */
config.checkEnvVariables();

/**
 * Create an express application.
 */
const app: Application = express();

/**
 * Configure middleware.
 * 1. Set the 'public' as a static folder.
 * 2. Use the express.json() to parse only when Content-Type: application/json.
 * 3. Use morgan for request logging.
 * 4. User swagger to create API documentation at /docs.
 */
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

/**
 * Use routers.
 */
app.use('/api', apiRouter);

/**
 * Function that initializes the application.
 * 1. Connect to the database.
 * 2. Start the server.
 */
async function start(seedDatabase?: boolean, dropDatabase?: boolean) {
  try {
    const connection = await createConnection(config.db);

    if (seedDatabase) {
      await seedDb();
    }

    if (dropDatabase) {
      await connection.dropDatabase();
    }

    app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  } catch (error) {
    console.log('Cannot connect to the database.', error);
    process.exit(1);
  }
}

/**
 * Initialize the application.
 */
start(false, false);
