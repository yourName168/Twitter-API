import User from '~/models/schemas/User.schema'
import { databaseService } from './database.services'
import { RegitsterRequestBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'
import { USERS_MESSAGE } from '~/constants/messages'
import RefreshTokens from '~/models/schemas/RefreshToken.Schema'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
dotenv.config() //file nào sử dụng process.env thì phải sử dụng hàm config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string
const emailVerifyTokenSecret = process.env.EMAIL_VERIFY_TOKEN_SECRET as string
class UsersService {
  private async signEmailVerifyToken(user_id: string) {
    return await signToken({
      payload: {
        user_id,
        type: TokenType.EmailVerifyToken
      },
      privateKey: emailVerifyTokenSecret,
      options: {
        expiresIn: '100d'
      }
    })
  }
  private async signAccessToken(user_id: string) {
    //tạo ra access token
    return await signToken({
      payload: {
        user_id,
        type: TokenType.AccessToken
      },
      privateKey: accessTokenSecret,
      options: {
        expiresIn: '15m'
        // đặt thời gian hết hạn
      }
    })
  }
  private async signRefreshToken(user_id: string) {
    //tạo ra access token
    return await signToken({
      payload: {
        user_id,
        type: TokenType.AccessToken
      },
      privateKey: refreshTokenSecret,
      options: {
        expiresIn: '100d'
      }
    })
  }
  private async signAccessAndRefreshToken(user_id: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id as string),
      this.signRefreshToken(user_id as string)
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
      this.signEmailVerifyToken(_id.toString()),
      this.signAccessAndRefreshToken(_id.toString())
    ])
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id,
        email_verify_token: emailVerifyTOken,
        //được sử dụng để truyền toàn bộ các thuộc tính của đối tượng payload
        //vào trong đối tượng User khi bạn tạo một đối tượng mới.
        password: hashPassword(payload.password),
        // mã hóa mật khẩu bằng cryto rồi mới lưu vào db
        date_of_birth: new Date(payload.date_of_birth)
        // chuyển kiểu nhập vào từ string sang lưu ở db là Date
      })
    )
    console.log(emailVerifyTOken)
    databaseService.refreshToken.insertOne(new RefreshTokens({ user_id: _id.toString(), token: res.refresh_token }))

    return res
  }
  async login(user: User) {
    const user_id = user._id
    const result = await this.signAccessAndRefreshToken(user_id.toString())
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
    databaseService.users.updateOne(
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
}

const usersService = new UsersService()
export default usersService
