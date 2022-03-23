const multer = require('multer');
const path = require('path');
// * Подключение multer хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/photo');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadPhoto = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files formate to upload');
  },
}).array('images', 1);

module.exports = uploadPhoto;
// module.exports = multer({ storage, fileFilter, limits, message })
