import User from './models/schemas/User.schema'
import { TokenPayload } from './models/requests/User.request'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorizarion?: TokenPayload
    decoded_email_verify_token?: TokenPayload
  }
}
