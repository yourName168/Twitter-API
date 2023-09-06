import { JwtPayload } from 'jsonwebtoken'
import User from './models/schemas/User.schema'
import { ObjectId } from 'mongodb'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorizarion?: JwtPayload
    decoded_email_verify_token?: any
  }
}
