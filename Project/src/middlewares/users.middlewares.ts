import { Request, Response, NextFunction, request } from 'express'
import { checkSchema } from 'express-validator'
import { databaseService } from '~/services/database.services'

const checkEmail = databaseService.users
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(404).json({
      message: 'missing email or password'
    })
  }
  next()
}
export const regitsterValidator = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 50
      }
    },
    trim: true
  },
  email: {
    notEmpty: true,
    isEmail: true,
    trim: true,
    custom: {
      options: async (value) => {
        const existingEmail = await checkEmail.findOne({ email: value })
        if (existingEmail !== null) {
          throw new Error('the email is exist')
        }
      }
    }
  },
  password: {
    isString: true,
    notEmpty: true,
    isStrongPassword: true
  },
  confirm_password: {
    isString: true,
    notEmpty: true,
    isStrongPassword: true,
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match')
        }
        return true
      }
    }
  },
  date_of_birth: {
    notEmpty: true,
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    }
  }
})
// kiểm tra xem schema truyền vào có phù hợp hay không
