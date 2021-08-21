import multer from 'multer';

/**
 * S3에 업로드 전 메모리에 이미지 저장.
 */
const storage = multer.memoryStorage();
const uploadProductFiles = multer({
  storage,
});

export default uploadProductFiles;
