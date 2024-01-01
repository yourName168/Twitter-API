import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { handleUpLoadSingleImage } from '~/utils/file'

// console.log(path.resolve('uploads'))

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await handleUpLoadSingleImage(req)
  return res.json({
    result: data
  })
}
