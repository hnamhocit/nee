import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createId } from '@paralleldrive/cuid2';
import pLimit from 'p-limit';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private bucketName: string;
  private readonly logger = new Logger(UploadService.name);

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.getOrThrow('AWS_S3_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  private getFolderNameFromMimeType(mimetype: string): string {
    if (mimetype.startsWith('image/')) return 'images';
    if (mimetype.startsWith('video/')) return 'videos';
    if (mimetype.startsWith('audio/')) return 'audios';
    return 'files';
  }

  private generateFileKey(file: Express.Multer.File, resource: string) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const folder = this.getFolderNameFromMimeType(file.mimetype);
    const path = `${resource}/${year}/${month}/${folder}`;

    const fileExtension = file.originalname.split('.').pop();
    return `${path}/${createId()}.${fileExtension}`;
  }

  async uploadFile(file: Express.Multer.File, resource: string) {
    const key = this.generateFileKey(file, resource);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);

      return key;
    } catch (error) {
      this.logger.error(`Upload failed: ${JSON.stringify(error)}`);
      throw error;
    }
  }

  async uploadFiles(files: Express.Multer.File[], resource: string) {
    const limit = pLimit(5);

    const uploadPromises = files.map((file) => {
      return limit(() => this.uploadFile(file, resource));
    });

    const results = await Promise.all(uploadPromises);

    return results;
  }

  async deleteFile(key: string) {
    if (!key) return;

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      await this.s3Client.send(command);

      this.logger.log(`Deleted file S3: ${key}`);
    } catch (error) {
      this.logger.error(`Delete S3 failed: ${key} - ${JSON.stringify(error)}`);
    }
  }
}
