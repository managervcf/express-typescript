import { S3 } from 'aws-sdk';
import { v1 as uuid } from 'uuid';
import { config } from '../config';
import { IGetUploadUrlResult } from '../types';

/**
 * Create a new S3 instance.
 */
const s3 = new S3({
  credentials: {
    accessKeyId: config.awsS3.accessKeyId,
    secretAccessKey: config.awsS3.secretAccessKey,
  },
});

const Bucket = config.awsS3.bucketName;

/**
 * Generates a random AWS Key.
 */
function generateAWSKey(folderName?: string) {
  return `${folderName ?? 'temp'}/${uuid()}.jpeg`;
}

/**
 * Gets a presigned url necessary to perform a file upload.
 * 1. Define the operationName as 'putObject' which is
 *    basically a file upload operation.
 * 2. Pull off the folder name for images.
 * 3. Generate a random key (upload filename).
 * 4. Obtain a signed url from S3.
 * 5. Print out a log to the console.
 * 6. Return the url.
 */
export async function getUploadUrl(): Promise<IGetUploadUrlResult> {
  const operationName = 'putObject';
  const key = generateAWSKey(config.awsS3.folderName);
  const params = {
    Bucket,
    ContentType: 'image/jpeg',
    Key: key,
  };
  const url = await s3.getSignedUrlPromise(operationName, params);

  console.dir(`(AWS S3) Obtained a signed url for ${key}. URL: ${url}`, {
    colors: true,
  });

  return { url };
}
