import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  // accessKeyId: process.env.KEYID,
  // secretAccessKey: process.env.KEY,
  // region: process.env.REGION,
});

const uploadProductFiles = multer({
  dest: 'uploads/',
});

export default uploadProductFiles;
