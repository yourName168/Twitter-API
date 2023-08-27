// Dùng để định nghĩa những interface request body gửi lên
export interface RegitsterRequestBody {
  name: string
  email: string
  password: string
  date_of_birth: string
}
export interface LoginRequestBody {
  email: string
  password: string
}
