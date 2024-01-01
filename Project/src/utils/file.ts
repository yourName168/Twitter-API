import fs from 'fs'
import path from 'path'
import { Request } from 'express'
export const initFolder = () => {
  if (!fs.existsSync('uploads')) {
    fs.mkdirSync(path.resolve('uploads')),
      {
        recursive: true
        // recursive: true để tạo thư mục con nếu chưa có
      }
  }
}

export const handleUpLoadSingleImage = async (req: Request) => {
  // cách sử dụng es module trong commonjs

  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 1024 * 1024 * 10
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      console.log(files)
      console.log(fields)
      if (err) {
        console.log()
        reject(err)
      }
      resolve(files)
    })
    // // hiện tại đang sử dụng formidable V2 nên muốn biết cách sử dụng các hàm
    // thì có thể xem tại document forminable nodejs
    // return res.status(200).json({
    //   message: 'Upload single image successfully'
    // })
  })
}
