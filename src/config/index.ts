import { ConnectionOptions } from 'typeorm';
import { Comment, Post, User } from '../models';

class Config {
  constructor(private entities?: Function[]) {}

  readonly port = Number(process.env.PORT) || 8000;
  readonly db: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'express-typescript-db',
    synchronize: true,
    entities: this.entities ?? [],
  };
}

export const config = new Config([Comment, Post, User]);
