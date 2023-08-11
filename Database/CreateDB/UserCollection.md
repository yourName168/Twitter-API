A. Phân tích User:
- Người dùng đăng ký nhập 'email', 'name', 'day_of_birth', 'password' là được.
- Sau khi đăng ký xong email có đính kèm 'email_verify_token' để xác thực email
- Tương tự ta có chức năng quên mật khẩu thì sẽ gửi mail về để reset mật khẩu, ta cũng dùng 'forgot_password_token' để xác thực.
- Nên có thêm trường 'verify' để biết trạng thái của user. Ví dụ chưa xác thực email, đã xác thực, bị khóa, ... Vậy giá trị của nó nên là enum


    enum UserVerifyStatus{
        Unverified,
        verified,
        Banned
    }
    interface User{
        _id: ObjectId
        name:string
        email:string
        date_of_birth:Date
        password:string
        created_at:Date
        updated_at:Date
        email_verify_token:string
        forgot_password_token:string
        verify:UserVerifyStatus
        
    }