import multer from 'multer'
const cloudUplaod = multer({
    storage:multer.memoryStorage(),
});

export default cloudUplaod;