import { Router, json } from 'express'
import { loginController } from '~/controllers/user.controller'
import { loginValidator } from '~/middlewares/users.middlewares'

const usersRoute = Router()

usersRoute.post('/login', loginValidator, loginController)

export default usersRoute
