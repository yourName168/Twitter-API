import jwt from 'jsonwebtoken'

export const signToken = async ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return await new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      //payload chứa thông tin của người dùng
      privateKey as string,
      // privateKey chứa khóa bảo mật để tạo jwt lưu trong db
      options as jwt.SignOptions,
      // options là thuật toán sử dụng mã hóa
      (err, token) => {
        if (err) {
          reject(err)
        }
        resolve(token as string)
      }
    )
  })
}
