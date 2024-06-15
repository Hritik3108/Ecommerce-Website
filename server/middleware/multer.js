// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // console.log('Storing file in tmp directory');
//         cb(null, '../server/tmp');
//     },
//     filename: (req, file, cb) => {
//         const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname);
//         // console.log('Generated filename:', filename);
//         cb(null, filename);
//     }
// });

// const uploadImage = multer({
//     storage: storage,
//     // limits: {
//     //     fileSize: 1000000, // Limit file size to 1MB
//     // },
// });

// module.exports = uploadImage;


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/tmp'); 
        },
    filename: (req, file, cb) => {
        // cb(null, `file_${Date.now()}`);
        cb(null, file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter,
});

module.exports = upload;
