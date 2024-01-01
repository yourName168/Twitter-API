import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import VerifyEmail from './VerifyEmail'
import VerifyForgotPasswordToken from './VerifyForgotPasswordToken'
import ResetPassword from './ResetPassword'
import EmailForgotPassword from './EmailForgotPassword'
import Chat from './Chat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login/oauth',
    element: <Login />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '/validate-forgot-password-token',
    element: <VerifyForgotPasswordToken />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/chat',
    element: <Chat />
  },
  {
    path:'/email-forgot-password',
    element: <EmailForgotPassword />
  }
])

export default router
