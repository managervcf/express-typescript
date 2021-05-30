import { ConnectionOptions } from 'typeorm';

enum EnvironmentVariables {
  ADMIN_SECRET = 'ADMIN_SECRET',
  AWS_S3_ACCESS_KEY_ID = 'AWS_S3_ACCESS_KEY_ID',
  AWS_S3_BUCKET_NAME = 'AWS_S3_BUCKET_NAME',
  AWS_S3_FOLDER_NAME = 'AWS_S3_FOLDER_NAME',
  AWS_S3_SECRET_ACCESS_KEY = 'AWS_S3_SECRET_ACCESS_KEY',
  JWT_SECRET = 'JWT_SECRET',
  PORT = 'PORT',
  POSTGRES_DB = 'POSTGRES_DB',
  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_USER = 'POSTGRES_USER',
}

/**
 * A config class that contains all the configuration options
 * of the application. Create an instance to use.
 */
class Config {
  /**
   * List of all required environment variables.
   */
  readonly envVariables = EnvironmentVariables;

  /**
   * Checks the presence of evironment variables.
   */
  public checkEnvVariables(): void {
    let missing: string[] = [];
    console.log('Checking environment variables:');
    console.dir(Object.values(this.envVariables), { colors: true });

    for (let variable in this.envVariables) {
      if (!process.env[variable]) {
        missing = [...missing, variable];
      }
    }

    if (missing.length) {
      throw new Error(`Environment variables missing: ${missing}`);
    }

    console.log('All environment variables defined');
  }

  /**
   * AWS S3 config options and keys.
   */
  readonly awsS3 = {
    bucketName: process.env[this.envVariables.AWS_S3_BUCKET_NAME]!,
    folderName: process.env[this.envVariables.AWS_S3_FOLDER_NAME]!,
    accessKeyId: process.env[this.envVariables.AWS_S3_ACCESS_KEY_ID]!,
    secretAccessKey: process.env[this.envVariables.AWS_S3_SECRET_ACCESS_KEY]!,
  };

  /**
   * Secret string for registering an admin.
   */
  readonly adminSecret = process.env[this.envVariables.ADMIN_SECRET]!;

  /**
   * Maximum uploaded image size. Value in bytes.
   */
  readonly maxImageSize = 1e7;

  /**
   * Salt rounds for encrypting passwords.
   */
  readonly saltRounds = 10;

  /**
   * JsonWebToken options.
   */
  readonly jwt = {
    secret: process.env[this.envVariables.JWT_SECRET]!,
    expiryTime: '1h',
  };

  /**
   * Default application port.
   */
  readonly port = process.env[this.envVariables.PORT]!;

  /**
   * Database connection options.
   */
  readonly db: ConnectionOptions = {
    type: 'postgres',
    host: process.env[this.envVariables.POSTGRES_HOST]!,
    port: +process.env[this.envVariables.POSTGRES_PORT]!,
    username: process.env[this.envVariables.POSTGRES_USER]!,
    password: process.env[this.envVariables.POSTGRES_PASSWORD]!,
    database: process.env[this.envVariables.POSTGRES_DB]!,
    synchronize: true,
    entities: ['src/entities/**/*.ts'],
  };
}

// Create a Config instance and export it.
export const config = new Config();
