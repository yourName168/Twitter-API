import { useEffect, useState } from 'react'
import useQueryParams from './useQueryParams'
import axios from 'axios'

export default function VerifyEmail() {
  const [message, setMessage] = useState()
  const { token } = useQueryParams()
  useEffect(() => {
    const controller = new AbortController()
    console.log("token:",token)
    if (token) {
      axios
        .post(

          '/users/verify-email', // URL xác thực email bên API Server của các bạn
          { email_verify_token: token },
          {
            baseURL: import.meta.env.VITE_API_URL,
            signal: controller.signal,
            
          }
        )
        .then((res) => {
          alert('Email đã được xác thực thành công')
          setMessage(res.data.message)
          if (res.data.result) {
            const { refresh_token } = res.data.result
            localStorage.setItem('refresh_token', refresh_token)
          }
        })
        .catch((err) => {
          console.log("err:",err.response.data)
          setMessage(err.response.data.message)
        })
    }
    return () => {
      controller.abort()
    }
  }, [token])
  return <div>{message}</div>
}
