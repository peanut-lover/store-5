import multer from 'multer';

const uploadProductFiles = multer({
  dest: 'uploads/',
});

export default uploadProductFiles.array;
