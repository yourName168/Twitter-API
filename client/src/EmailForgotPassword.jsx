import axios from 'axios';
import { useState } from 'react';
const controller = new AbortController()

function MyForm() {
  // Sử dụng useState để quản lý các giá trị của các trường nhập liệu
  const [email, setEmail] = useState('');

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị của trường nhập liệu "Email"
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Hàm xử lý sự kiện khi biểu mẫu được gửi đi
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn form gửi lại trang

    // Đặt lại các trường nhập liệu sau khi gửi biểu mẫu
    setEmail('');
  };
  return (
    <form onSubmit={handleSubmit}>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <button type="submit"
          onClick={() => {
            axios.post(
              '/users/forgot-password', // URL gửi yêu cầu quên mật khẩu bên API Server của các bạn
              { email },
              {
                baseURL: import.meta.env.VITE_API_URL,
                signal: controller.signal
              }
            )
              .then((res) => {
                alert("please check your email")

              })
              .catch((err) => {
                alert(err)
              })
          }
          }
        >Gửi</button>
      </div>
    </form>
  );
}

export default MyForm;
