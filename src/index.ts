import 'reflect-metadata';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import { apiRouter } from './routes';
import { config } from './config';

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use('/api', apiRouter);

async function start() {
  try {
    await createConnection(config.db);
    app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  } catch (error) {
    console.log('Cannot connect to the database.', error);
    process.exit(1);
  }
}

start();
