import { Body, Post, Route, Tags } from 'tsoa';
import { config } from '../config';
import {
  IGetUploadUrlResult,
  IGetPresignedUrlArgs,
  ErrorMessage,
} from '../types';
import { getUploadUrl } from '../utils';

@Route('/api/upload')
@Tags('Upload')
export class UploadService {
  @Post('/')
  async getPresignedUrl(
    @Body() { type, size }: IGetPresignedUrlArgs
  ): Promise<IGetUploadUrlResult> {
    if (!type || !size) {
      throw new Error(ErrorMessage.NoUploadFile);
    }
    if (!type.match(/image\/jpeg/gi)) {
      throw new Error(ErrorMessage.NotAnImage);
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
