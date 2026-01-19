declare module "multer-storage-cloudinary" {
  import { v2 as cloudinary } from "cloudinary";
  import { StorageEngine } from "multer";

  export interface Options {
    cloudinary: typeof cloudinary;
    params?: (
      req: any,
      file: any,
    ) =>
      | Promise<{
          folder?: string;
          resource_type?: string;
          allowed_formats?: string[];
          public_id?: string;
          [key: string]: any;
        }>
      | { [key: string]: any };
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: Options);
    _handleFile(req: any, file: any, cb: any): void;
    _removeFile(req: any, file: any, cb: any): void;
  }
}
