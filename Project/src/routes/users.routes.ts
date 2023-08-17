import { Router, json } from 'express'
import { loginController, regitsterController } from '~/controllers/user.controller'
import { loginValidator } from '~/middlewares/users.middlewares'

const usersRoute = Router()

usersRoute.post('/login', loginValidator, loginController)
usersRoute.post('/regitster', regitsterController)

export default usersRoute
