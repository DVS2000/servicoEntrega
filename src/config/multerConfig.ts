import multer, { StorageEngine, diskStorage, Multer } from 'multer'

const storageConfig: StorageEngine = diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/upload')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString() + file.originalname.replace(' ', ''))
  }
})

export const multerConfig: Multer = multer({ storage: storageConfig })
