import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3-v2';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new aws.S3({
  region: process.env.AWS_BUCKET_REGION,
  credentials: new aws.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }),
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      cb(null, `images/${file.fieldname}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;
