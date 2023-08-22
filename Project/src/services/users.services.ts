import User from '~/models/schemas/User.schema'
import { databaseService } from './database.services'
import { RegitsterRequestBody } from '~/models/requests/User.request'
import { hashPassword } from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'
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
  async regitster(payload: RegitsterRequestBody) {
    const { email, password, name, date_of_birth } = payload
    // const result = await databaseService.users.insertOne(
    //   // do insertOne là một Promise nên để thao tác thêm dữ liệu vào DB được hoàn thành
    //   // rồi mới chuyển sang bước tiếp theo nên ta sẽ sử dụng async function
    //   new User({
    //     email,
    //     password
    //   })
    // )
    try {
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
      const [access_token, refresh_token] = await Promise.all([
        this.signAccessToken(user_id),
        this.signRefreshToken(user_id)
      ])

      console.log('Insert result:', access_token)
      return { access_token, refresh_token }
    } catch (error) {
      console.error('Insert error:', error)
    }
  }
}
const usersService = new UsersService()
export default usersService
