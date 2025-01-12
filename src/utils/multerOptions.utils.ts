import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';

// Configuração do cliente S3 com o AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const multerOptions = {
  storage: multerS3({
    s3: s3,
    bucket: 'my-streaming-app',
    // acl: 'public-read', // Permissões de leitura pública
    contentType: multerS3.AUTO_CONTENT_TYPE, // Tipo de conteúdo detectado automaticamente
    key: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`; // Garante nome único
      cb(null, filename); // Passa o nome do arquivo para o S3
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/mkv', 'video/avi'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'), false); // Bloqueia tipos não permitidos
    } else {
      cb(null, true);
    }
  },
};
