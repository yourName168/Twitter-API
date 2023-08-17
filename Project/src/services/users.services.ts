import User from '~/models/schemas/User.schema'
import { databaseService } from './database.services'

class UsersService {
  async regitster(payload: { email: string; password: string }) {
    const { email, password } = payload
    // const result = await databaseService.users.insertOne(
    //   // do insertOne là một Promise nên để thao tác thêm dữ liệu vào DB được hoàn thành
    //   // rồi mới chuyển sang bước tiếp theo nên ta sẽ sử dụng async function
    //   new User({
    //     email,
    //     password
    //   })
    // )
    try {
      const result = await databaseService.users.insertOne(new User({ email, password }))
      console.log('Insert result:', result)
    } catch (error) {
      console.error('Insert error:', error)
    }
  }
}
const usersService = new UsersService()
export default usersService
