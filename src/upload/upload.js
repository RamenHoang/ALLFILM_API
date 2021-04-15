const multer = require('multer');
const { diskStorage } = require('multer');

function upload(savePath) {
  const storage = diskStorage({
    destination(req, file, cb) {
      cb(null, savePath);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true); // accept a file
    } else cb(null, false); // reject a file
  };

  const up = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
  });

  return up;
}

module.exports = upload;

// usage

// const upload = require('...')(savePath);

//* *upload single file**

// router.post("/", upload.single("productImage"), (req, res, next) => {

//* *upload multipe file**
// router.post("/", upload.array("productImage",10), (req, res, next) => {
