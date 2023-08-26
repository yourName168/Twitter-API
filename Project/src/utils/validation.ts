import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'

// can be reused by many routes

// sequential processing, stops running validation chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    // Lệnh validation.run(req) chạy chuỗi các quy
    //tắc kiểm tra dữ liệu trên yêu cầu req có trong checkSchema
    const errors = validationResult(req)
    // kiểm tra có lỗi trong quá trình validate hay không
    if (errors.isEmpty()) {
      return next()
      //nếu không có lỗi thì chuyển sang regitsterController
    }
    res.status(400).json({ errors: errors.mapped() })
  }
}
