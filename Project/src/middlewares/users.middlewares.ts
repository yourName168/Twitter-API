import { checkSchema } from 'express-validator'
import { USERS_MESSAGE } from '~/constants/messages'
import User from '~/models/schemas/User.schema'
import { databaseService } from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'

const usersService = databaseService.users
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
export const loginValidator = checkSchema({
  email: {
    isEmail: {
      errorMessage: USERS_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const user = await usersService.findOne({ email: value })
        if (user === null) {
          throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
        }
        req.user = user
        return true
      }
    }
  },
  password: {
    custom: {
      options: async (value, { req }) => {
        const user = req.user
        console.log(user)
        if (hashPassword(value) !== user?.password) {
          throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
        }
        return true
      }
    }
  }
})
export const regitsterValidator = checkSchema({
  name: {
    notEmpty: {
      errorMessage: USERS_MESSAGE.NAME_IS_REQUIRED
    },
    isString: {
      errorMessage: USERS_MESSAGE.NAME_MUST_BE_A_STRING
    },
    isLength: {
      options: {
        min: 1,
        max: 50
      },
      errorMessage: USERS_MESSAGE.NAME_LENGTH_MUST_BE_FROM_1_TO_50
    },
    trim: true
  },
  email: {
    notEmpty: {
      errorMessage: USERS_MESSAGE.EMAIL_IS_REQUIRED
    },
    isEmail: {
      errorMessage: USERS_MESSAGE.EMAIL_IS_INVALID
    },
    trim: true,
    custom: {
      options: async (value) => {
        const existingEmail = await usersService.findOne({ email: value })
        if (existingEmail !== null) {
          throw new Error(USERS_MESSAGE.EMAIL_ALREADY_EXIST)
        }
        return true
      }
    }
  },
  password: {
    notEmpty: {
      errorMessage: USERS_MESSAGE.PASSWORD_IS_REQUIRED
    },
    isStrongPassword: {
      errorMessage: USERS_MESSAGE.PASSWORD_MUST_BE_STRONG
    }
  },
  confirm_password: {
    notEmpty: {
      errorMessage: USERS_MESSAGE.COMFIRM_PASSWORD_IS_REQUIRED
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(USERS_MESSAGE.CONFIRM_PASSWORD_MUST_BE_SAME_PASSWORD)
        }
        return true
      }
    }
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      },
      errorMessage: USERS_MESSAGE.DATE_OF_BIRTH_MUST_BE_ISO8601
    }
  }
})
// kiểm tra xem schema truyền vào có phù hợp hay không
