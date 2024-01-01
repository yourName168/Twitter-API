import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
const controller = new AbortController()

function MyForm() {
  const location = useLocation();
  const { forgot_password_token } = location.state;
  // Sử dụng useState để quản lý các giá trị của các trường nhập liệu
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị của trường nhập liệu "Password"
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị của trường nhập liệu "Confirm Password"
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Hàm xử lý sự kiện khi biểu mẫu được gửi đi
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn form gửi lại trang

    // Đặt lại các trường nhập liệu sau khi gửi biểu mẫu

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirm_password}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={() => {
            axios.post(
              '/users/reset-password', // URL gửi yêu cầu quên mật khẩu bên API Server của bạn
              {
                password,
                confirm_password
              },
              {
                baseURL: import.meta.env.VITE_API_URL,
                signal: controller.signal,
                headers: {
                  Authorization: `Bearer ${forgot_password_token}`
                }
              }
            )
              .then((res) => {
                if (res.status === 202) {
                  alert("reset password successfully")
                  console.log(res)
                }
              })
              .catch((error) => {
                alert("reset password failed")
                console.log(error)
              });
          }}
        >
          Reset password
        </button>
      </div>
    </form>
  );
}

export default MyForm;
