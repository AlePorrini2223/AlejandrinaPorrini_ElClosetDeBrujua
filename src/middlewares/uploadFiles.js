const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
   destination: "public/images/products",
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // genera un sufijo único para evitar que se sobreescriban los archivos 
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
});

module.exports = upload;