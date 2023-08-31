import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.Schema'
dotenv.config() //file nào sử dụng process.env thì phải sử dụng hàm config()
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME
const dbName = process.env.DB_NAME
const userCollection = process.env.DB_USERCOLLECTION
const refreshTokenCollection = process.env.DB_REFRESHTOKENCOLLECTION

const uri = `mongodb+srv://${username}:${password}@twitter.76xkcay.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${dbName}`)
  }
  async connect() {
    try {
      // Connect the this.client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.log('Try connect to mongoDB')
      // bỏ finally vì nếu đóng lại thì không thể chỉnh sửa dữ liệu trong db
    }
  }
  get users(): Collection<User> {
    // sử dụng generic //đặt kiểu dữ liệu trả về của hàm là Collection<User>
    return this.db.collection(`${userCollection}`)
    // hàm này trả về collection Users giúp tương tác với collection trong db
  }
  // từ khóa get giúp cho việt gọi tới hàm users không cần có dấu ()
  // mà chỉ cần gọi tới như một thuộc tính
  // nếu không có get thì sẽ gọi tới giống như một phương thức
  //vd dùng get: databaseService.users
  // vd k dùng get: databaseService.users()
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(`${refreshTokenCollection}`)
  }
}
// tạo object từ class DatabaseService
export const databaseService = new DatabaseService()
