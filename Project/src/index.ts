import { Request, Response, NextFunction } from 'express'
import express from 'express'
import usersRouter from './routes/users.routes'
import { databaseService } from './services/database.services'

const app = express()
const port = 3000
app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
app.use(express.json())
//Biến đổi json gửi lên thành object
app.use('/user', usersRouter)
// sử dụng router
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: err.message })
})
// error handler cho cả app
databaseService.connect()
//khi gọi tới run() thì hàm sẽ trả về một promise và sẽ chạy các khối
// có trong hàm run
