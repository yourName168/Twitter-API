import { Router } from 'express'

const userRouter = Router()

userRouter.use((req, res, next) => {
  console.log('using midleware')
  next()
  // Do một method có thể chứa nhiều midleware nên khi next() một midlewares
  // này thì mới có thể chuyển sang midleware tiếp theo
  // Nếu không sẽ bị dừng
  console.log('áldfhfsf')
})
//sử dụng router.use như trên sẽ áo dụng cho tất cả app Method
userRouter.get(
  '/tweet',
  (req, res, next) => {
    console.log('using midleware at', Date.now())
    next()
  },
  //phương thức này truyền midleware vào trong app method và chỉ hữu dụng
  // với route trong app method này
  (req, res) => {
    res.send('TWEET CONTENT')
  }
)

userRouter.get('/User', (req, res) => {
  res.send('User CONTENT')
})

export default userRouter
