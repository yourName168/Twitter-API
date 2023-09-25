import { Request, Response, NextFunction } from 'express'
import path from 'path'

// console.log(path.resolve('uploads'))

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  // cách sử dụng es module trong commonjs
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 10 * 1024 * 1024
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(err)
    }
    console.log(files)
  })

  // // hiện tại đang sử dụng formidable V2 nên muốn biết cách sử dụng các hàm
  // thì có thể xem tại document forminable nodejs
  // return res.status(200).json({
  //   message: 'Upload single image successfully'
  // })
}
