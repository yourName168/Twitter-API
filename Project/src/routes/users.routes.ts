import { Router, json } from 'express'
import { loginController, regitsterController } from '~/controllers/user.controller'
import { loginValidator, regitsterValidator } from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'

const usersRoute = Router()

usersRoute.post('/login', loginValidator, loginController)
/**
 * Description. Regitster a new user
 * path: /regitster
 * mothod: POST
 * Body:{name:string,password:string,email:string,date_of_birth:ISO8601
 * ,confirm_password:string}
 */

usersRoute.post('/regitster', validate(regitsterValidator), regitsterController)

export default usersRoute
