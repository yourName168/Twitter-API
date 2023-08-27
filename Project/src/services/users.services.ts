import User from '~/models/schemas/User.schema'
import { databaseService } from './database.services'
import { LoginRequestBody, RegitsterRequestBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'
import { USERS_MESSAGE } from '~/constants/messages'
class UsersService {
  private async signAccessToken(user_id: string) {
    //tạo ra access token
    return await signToken({
      payload: {
        user_id,
        type: TokenType.AccessToken
      },
      options: {
        expiresIn: '5m'
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
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        //được sử dụng để truyền toàn bộ các thuộc tính của đối tượng payload
        //vào trong đối tượng User khi bạn tạo một đối tượng mới.
        password: hashPassword(payload.password),
        // mã hóa mật khẩu bằng cryto rồi mới lưu vào db
        date_of_birth: new Date(payload.date_of_birth)
        // chuyển kiểu nhập vào từ string sang lưu ở db là Date
      })
    )
    const user_id = result.insertedId.toString()
    return this.signAccessAndRefreshToken(user_id)
  }
  async login(user_id: string) {
    return this.signAccessAndRefreshToken(user_id)
  }
}

const usersService = new UsersService()
export default usersService
