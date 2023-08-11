import express from 'express'
import usersRouter from './routes/users.routes'
const app = express()
const port = 3000
app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
app.use(express.json())
//Biến đổi json gửi lên thành object
app.use('/user', usersRouter)
// sử dụng router
