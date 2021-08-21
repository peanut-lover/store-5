import AWS from 'aws-sdk';
import { awsS3Config } from '../config';

const PRODUCT_DIRECTORY = 'product';
export const uploadProductImages = (files: Express.Multer.File[]): Promise<string[]> =>
  uploadMultiImagesToS3(files, PRODUCT_DIRECTORY);

const PROMOTION_DIRECTORY = 'promotion';
export const uploadPromotionImage = async (file: Express.Multer.File): Promise<string> => {
  const images = await uploadMultiImagesToS3([file], PROMOTION_DIRECTORY);
  return images[0];
};

export const uploadMultiImagesToS3 = async (files: Express.Multer.File[], directory = ''): Promise<string[]> => {
  const directoryPath = directory.replace(/\/$/g, ''); // 마지막 슬래쉬 제거

  const s3bucket = new AWS.S3({
    accessKeyId: awsS3Config.accessKeyId,
    secretAccessKey: awsS3Config.secretAccessKey,
    region: awsS3Config.region,
  });

  const uploadPromises = files.map(async (file) => {
    const params = {
      Bucket: awsS3Config.bucketName,
      Key: directoryPath + '/' + Date.now() + '-' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    const s3SendData = await s3bucket.upload(params).promise();
    return awsS3Config.uploadUrl + s3SendData.Key;
  });

  return await Promise.all(uploadPromises);
};
