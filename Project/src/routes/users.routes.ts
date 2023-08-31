import { Router } from 'express'
import { loginController, logoutController, regitsterController } from '~/controllers/user.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  regitsterValidator
} from '~/middlewares/users.middlewares'
import { wrap } from '~/utils/handlers'
import { validate } from '~/utils/validation'

const usersRoute = Router()
/**
 * Description. login a new user
 * path: /login
 * mothod: POST
 * Body:{password:string,email:string}
 */
usersRoute.post('/login', validate(loginValidator), wrap(loginController))
/**
 * Description. Regitster a new user
 * path: /regitster
 * mothod: POST
 * Body:{name:string,password:string,email:string,date_of_birth:ISO8601
 * ,confirm_password:string}
 */

usersRoute.post('/regitster', validate(regitsterValidator), wrap(regitsterController))
/**
 * Description. logout a  user
 * path: /logout
 * mothod: POST
 * Header:{Authorization:Bearer <access_token>}
 * Body:{refresh_token:string}
 */

usersRoute.post('/logout', validate(accessTokenValidator), validate(refreshTokenValidator), wrap(logoutController))

export default usersRoute
