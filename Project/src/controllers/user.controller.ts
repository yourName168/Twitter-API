import { Request, Response, NextFunction } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegitsterRequestBody, resetPasswordRequestBody } from '~/models/requests/User.request'
import HTTP_STATUS from '~/constants/httpStatus'
import User from '~/models/schemas/User.schema'
import { databaseService } from '~/services/database.services'
import { USERS_MESSAGE } from '~/constants/messages'
import { ObjectId } from 'mongodb'
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.user as User
  const result = await usersService.login(user)
  return res.status(HTTP_STATUS.APPECTED).json({
    message: 'login success!',
    result
  })
}
export const regitsterController = async (
  req: Request<ParamsDictionary, any, RegitsterRequestBody>,
  //RegitsterRequestBody dùng để gán kiểu cho body gửi lên từ request Regitster
  res: Response,
  next: NextFunction
) => {
  // câu lệnh giúp giả định lỗi để luồng chạy xuống khối catch
  const result = await usersService.regitster(req.body)
  // truyền vào hàm regitster một object do hàm regitster nhận vào payload
  // là object gồm email và password
  return res.status(HTTP_STATUS.CREATED).json({
    message: 'regitster success!',
    result
  })
}
export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}
export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  const decoded_email_verify_token = req.decoded_email_verify_token
  const { user_id } = decoded_email_verify_token
  const result = await usersService.verifyEmail(user_id)
  return res.json(result)
}
export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user
  const { _id } = user as User
  const result = await usersService.forgotPassword(_id.toString())
  return res.json(result)
}
export const resetPasswordController = async (
  req: Request<ParamsDictionary, any, resetPasswordRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user
  const { _id } = user as User
  const result = await usersService.resetPassword(req.body, _id.toString())
  return res.json(result)
}
