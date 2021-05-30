import { Body, Post, Route, Tags } from 'tsoa';
import { config } from '../config';
import { GetUploadUrlResult } from '../types';
import { GetPresignedUrlArgs } from '../types/interfaces/get-presigned-url-args.interface';
import { getUploadUrl } from '../utils';

@Route('/api/upload')
@Tags('Upload')
export class UploadService {
  @Post('/')
  public async getPresignedUrl(
    @Body() { type, size }: GetPresignedUrlArgs
  ): Promise<GetUploadUrlResult> {
    if (!type || !size) {
      throw new Error('Must upload a file');
    }
    if (!type.match(/image\/jpeg/gi)) {
      throw new Error('File type must be of image/jpeg');
    }
    if (size > config.maxImageSize || size <= 0) {
      throw new Error(
        `File size cannot exceed ${
          config.maxImageSize / 1e6
        } MB. Provided file size ${size / 1e6} MB`
      );
    }
    const url = await getUploadUrl();

    return url;
  }
}

export const uploadService = new UploadService();
