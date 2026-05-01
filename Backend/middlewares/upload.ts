const multer = require('multer')


// const storage = multer.diskStorage({
//     destination: function (req: any, file: any, cb: any) {
//         cb(null, 'uploads/')
//     },
//     filename: function (_req: any, file: any, cb: any) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

// export default upload;

const storage = multer.memoryStorage();

const upload = multer({ storage });
export default upload;