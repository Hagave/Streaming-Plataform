import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { configureAWS } from 'src/utils/aws.config.util';

interface S3UploadResponse {
  ETag: string;
  Location: string;
  Key: string;
  Bucket: string;
}

@Injectable()
export class S3Service {
  private s3: S3Client;

  constructor() {
    configureAWS();
    this.s3 = new S3Client({});
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<S3UploadResponse> {
    const key = `${Date.now()}-${file.originalname}`; // Gerando a chave única para o arquivo
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const command = new PutObjectCommand(params);
      const data = await this.s3.send(command);

      console.log('S3 Upload Response:', data);

      // Gerar a URL completa com a chave e o bucket
      const location = `https://${bucketName}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;

      // Retornar o resultado tipado
      return {
        ETag: data.ETag!,
        Location: location, // Agora com a URL completa
        Key: key, // Retorna a chave que geramos
        Bucket: bucketName, // Retorna o nome do bucket
      };
    } catch (error) {
      throw new Error(`Error uploading to S3: ${error.message}`);
    }
  }
}
