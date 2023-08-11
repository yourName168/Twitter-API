import express from 'express'
import userRouter from './user.route'
const app = express()
const port = 3000
app.listen(port, () => {
  console.log(`The server is running on port ${port}`)
})
app.use('/user', userRouter)

//midleware
