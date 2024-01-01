import express from 'express'
import usersRouter from './routes/users.routes'
import { databaseService } from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import cors from 'cors'
const app = express()
const port = 4000
databaseService.connect()
app.use(cors())
app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})

initFolder()
app.use(express.json())
//Biến đổi json gửi lên thành object
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
// sử dụng router
app.use(defaultErrorHandler)
// error handler cho cả app
//khi gọi tới run() thì hàm sẽ trả về một promise và sẽ chạy các khối
// có trong hàm run
