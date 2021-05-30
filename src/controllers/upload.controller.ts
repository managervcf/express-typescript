import { Request, Response } from 'express';
import { UploadService, uploadService } from '../services';
import { IGetUploadUrlResult } from '../types';

class UploadController {
  constructor(private uploadService: UploadService) {}

  /**
   * Generates a presigned url required for a file upload to AWS S3.
   */
  public getPresignedUrl = async (
    req: Request,
    res: Response
  ): Promise<Response<IGetUploadUrlResult>> => {
    const url = await this.uploadService.getPresignedUrl(req.body);
    return res.send(url);
  };
}

export const uploadController = new UploadController(uploadService);
