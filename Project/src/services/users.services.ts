import User from '~/models/schemas/User.schema'
import { databaseService } from './database.services'
import {
  RegitsterRequestBody,
  resetPasswordRequestBody,
  updateMyProfileRequestBody
} from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enum'
import { USERS_MESSAGE } from '~/constants/messages'
import RefreshTokens from '~/models/schemas/RefreshToken.Schema'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
dotenv.config() //file nào sử dụng process.env thì phải sử dụng hàm config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
const emailVerifyTokenSecret = process.env.EMAIL_VERIFY_TOKEN_SECRET as string
const forgotPasswordSecret = process.env.FORGOT_PASSWORD_TOKEN_SECRET as string
class UsersService {
  private async signForgotPasswordToken(user_id: string, userStatus: UserVerifyStatus) {
    return await signToken({
      payload: {
        user_id,
        verify: userStatus,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: forgotPasswordSecret,
      options: {
        expiresIn: '100d'
      }
    })
  }
  private async signEmailVerifyToken(user_id: string, userStatus: UserVerifyStatus) {
    return await signToken({
      payload: {
        user_id,
        verify: UserVerifyStatus.Unverified,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: emailVerifyTokenSecret,
      options: {
        expiresIn: '100d'
      }
    })
  }
  private async signAccessToken(user_id: string, userStatus: UserVerifyStatus) {
    //tạo ra access token
    return await signToken({
      payload: {
        user_id,
        verify: UserVerifyStatus.Unverified,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: accessTokenSecret,
      options: {
        expiresIn: '15m'
        // đặt thời gian hết hạn
      }
    })
  }
  private async signRefreshToken(user_id: string, userStatus: UserVerifyStatus) {
    //tạo ra access token
    return await signToken({
      payload: {
        user_id,
        verify: UserVerifyStatus.verified,
        token_type: TokenType.ForgotPasswordToken
      },
      privateKey: refreshTokenSecret,
      options: {
        expiresIn: '100d'
      }
    })
  }
  private async signAccessAndRefreshToken(user_id: string, userStatus: UserVerifyStatus) {
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id as string, userStatus),
      this.signRefreshToken(user_id as string, userStatus)
    ])
    return { access_token, refresh_token }
  }
  async regitster(payload: RegitsterRequestBody) {
    // const result = await databaseService.users.insertOne(
    //   // do insertOne là một Promise nên để thao tác thêm dữ liệu vào DB được hoàn thành
    //   // rồi mới chuyển sang bước tiếp theo nên ta sẽ sử dụng async function
    //   new User({
    //     email,
    //     password
    //   })
    // )
    const _id = new ObjectId()
    const [emailVerifyTOken, res] = await Promise.all([
      this.signEmailVerifyToken(_id.toString(), 0),
      this.signAccessAndRefreshToken(_id.toString(), 0)
    ])
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id,
        username: `user${_id.toString()}`,
        email_verify_token: emailVerifyTOken,
        //được sử dụng để truyền toàn bộ các thuộc tính của đối tượng payload
        //vào trong đối tượng User khi bạn tạo một đối tượng mới.
        password: hashPassword(payload.password),
        // mã hóa mật khẩu bằng cryto rồi mới lưu vào db
        date_of_birth: new Date(payload.date_of_birth)
        // chuyển kiểu nhập vào từ string sang lưu ở db là Date
      })
    )
    // send email verify
    console.log(emailVerifyTOken)
    // thêm RefreshToken vào trong database
    databaseService.refreshToken.insertOne(new RefreshTokens({ user_id: _id.toString(), token: res.refresh_token }))

    return res
  }
  async login(user: User) {
    const user_id = user._id
    const userStatus = user.verify
    const result = await this.signAccessAndRefreshToken(user_id.toString(), userStatus)
    databaseService.refreshToken.insertOne(
      new RefreshTokens({ user_id: user_id.toString(), token: result.refresh_token })
    )
    return result
  }
  async logout(refresh_token_id: string) {
    databaseService.refreshToken.deleteOne({ token: refresh_token_id })
    return {
      message: USERS_MESSAGE.LOGOUT_SUCCESS
    }
  }
  async verifyEmail(user_id: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token: '',
          verify: 1,
          updated_at: new Date()
        }
      }
    )
    return {
      message: USERS_MESSAGE.VERIFY_EMAIL_SUCCESS
    }
  }
  async forgotPassword(user: User) {
    const { _id, verify } = user
    const forgot_password_token = await this.signForgotPasswordToken(_id.toString(), verify)
    // send email forgot password
    console.log(forgot_password_token)
    await databaseService.users.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          forgot_password_token,
          updated_at: new Date()
        }
      }
    )
    return {
      message: USERS_MESSAGE.FORGOT_PASSWORD_SUCCESS
    }
  }
  async resetPassword(payload: resetPasswordRequestBody, _id: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          forgot_password_token: '',
          password: hashPassword(payload.password),
          updated_at: new Date()
        }
      }
    )
    return {
      message: USERS_MESSAGE.RESET_PASSWORD_SUCCESS
    }
  }
  async getMe(user_id: string) {
    const user = await databaseService.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  }
  async updateMyProfile(user_id: string, payload: updateMyProfileRequestBody) {
    const { userName, date_of_birth } = payload
    const DOB = new Date(date_of_birth)
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload
    const user = await databaseService.users.findOneAndUpdate(
      {
        _id: new ObjectId(user_id)
      },
      {
        $set: {
          ...(_payload as updateMyProfileRequestBody & { date_of_birth?: Date })
        },
        $currentDate: {
          updated_at: true
        }
      },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        },
        returnDocument: 'after'
      }
    )
    return user.value
  }
  async getProfile(username: string) {
    const user = await databaseService.users.findOne(
      { username },
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0,
          verify: 0
        }
      }
    )
    if (user === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return user
  }
}

const usersService = new UsersService()
export default usersService
