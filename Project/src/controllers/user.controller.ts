import { Request, Response, NextFunction } from 'express'
import usersService from '~/services/users.services'
//Nếu như sử dụng req,res, next trong Router thì không cần khai báo kiểu dữ liệu
// vì trong ngữ cảnh sử dụng Router Typescript tự động hiểu kiểu dữ liệu của của
// còn trong trường hợp này ta tách ra một middleware không có router nên cần gán kiểu
// dữ liệu cho req, res, next để chặt chẽ hơn
export const loginController = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (email === 'hieule1235@gmail.com' && password === '1234')
    return res.json({
      message: 'login sucess'
    })
  else
    return res
      .json({
        message: 'login fail'
      })
      .status(400)
  next()
}
export const regitsterController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    const result = await usersService.regitster({ email, password })
    // truyền vào hàm regitstẻ một object do hàm regitster nhận vào payload
    // là object gồm email và password
    return res.status(200).json({
      message: 'regitster success!',
      result
    })
  } catch (error) {
    return res.status(200).json({
      message: 'regitster FAIL!'
    })
  }
}
