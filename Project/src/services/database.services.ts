import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME

const uri = `mongodb+srv://${username}:${password}@twitter.fxqtv0r.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Connect the this.client to the server	(optional starting in v4.7)
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      console.dir()
    } finally {
      // Ensures that the this.client will close when you finish/error
      await this.client.close()
    }
  }
}
// tạo object từ class DatabaseService
export const databaseService = new DatabaseService()
