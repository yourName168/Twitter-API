import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  regitsterController,
  resetPasswordController,
  verifyEmailController
} from '~/controllers/user.controller'
import {
  accessTokenValidator,
  emailValidator,
  emailVerifyTokenValidator,
  forgotPasswordTokenValidator,
  loginValidator,
  refreshTokenValidator,
  regitsterValidator,
  resetPasswordValidator
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
/**
 * Description. verify user
 * path: /verify
 * mothod: POST
 * Body:{email_verify_token:string}
 */

usersRoute.post('/verify-email', validate(emailVerifyTokenValidator), wrap(verifyEmailController))
/**
 * Description. forgot password
 * path: /forgot-password
 * mothod: POST
 * Body:{email:string}
 */

usersRoute.post('/forgot-password', validate(emailValidator), wrap(forgotPasswordController))

/**
 * Description. validate forgot password token
 * path: /validate-forgot-password-token
 * mothod: POST
 * Body:{forgot_password_token:JWT}
 */

usersRoute.post('/validate-forgot-password-token', validate(forgotPasswordTokenValidator), (req, res, next) => {
  res.status(200).json({
    message: 'forgot password token is valid'
  })
})
/**
 * Description. reset password
 * path: /reset-password
 * mothod: POST
 * Body:{email:string}
 */

usersRoute.post('/reset-password', validate(resetPasswordValidator), wrap(resetPasswordController))

export default usersRoute
