export interface IGetUploadUrlResult {
  url: string;
}

export interface IGetPresignedUrlArgs {
  type: string;
  size: number;
}
