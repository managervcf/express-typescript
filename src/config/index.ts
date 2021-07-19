import { FieldType, StringType } from 'body-validator';
import { ConnectionOptions } from 'typeorm';
import { EnvironmentVariables, IValidationSchema } from '../types';

/**
 * A config class that contains all the configuration options
 * of the application. Create an instance to use.
 */
class Config {
  /**
   * Checks the presence of evironment variables.
   */
  checkEnvVariables(): void {
    let missing: string[] = [];
    console.log('Checking environment variables:');
    console.dir(Object.values(EnvironmentVariables), { colors: true });

    for (let variable in EnvironmentVariables) {
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
    bucketName: process.env[EnvironmentVariables.AWS_S3_BUCKET_NAME]!,
    folderName: process.env[EnvironmentVariables.AWS_S3_FOLDER_NAME]!,
    accessKeyId: process.env[EnvironmentVariables.AWS_S3_ACCESS_KEY_ID]!,
    secretAccessKey:
      process.env[EnvironmentVariables.AWS_S3_SECRET_ACCESS_KEY]!,
  };

  /**
   * Secret string for registering an admin.
   */
  readonly adminSecret = process.env[EnvironmentVariables.ADMIN_SECRET]!;

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
    secret: process.env[EnvironmentVariables.JWT_SECRET]!,
    expiryTime: '1h',
  };

  /**
   * Default application port.
   */
  readonly port = 8000;

  /**
   * Database connection options.
   */
  readonly db: ConnectionOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env[EnvironmentVariables.POSTGRES_USER]!,
    password: process.env[EnvironmentVariables.POSTGRES_PASSWORD]!,
    database: process.env[EnvironmentVariables.POSTGRES_DB]!,
    synchronize: true,
    entities: ['src/entities/**/*.ts'],
  };

  /**
   * Validation schemas.
   */
  readonly userValidationSchema: IValidationSchema = {
    schema: [
      { name: 'email', required: true, stringType: StringType.Email },
      { name: 'password', required: true, minlength: 4, maxlength: 20 },
      { name: 'adminSecret', required: false },
    ],
  };

  readonly recipeValidationSchema: IValidationSchema = {
    schema: [
      { name: 'name', required: true },
      { name: 'description', required: false },
      { name: 'instructions', required: false },
      { name: 'url', required: true },
      { name: 'preparationTime', required: true },
      {
        name: 'ingredients',
        required: true,
        type: FieldType.List,
        minlength: 1,
        maxlength: 50,
      },
    ],
  };
}

// Create a Config instance and export it.
export const config = new Config();
