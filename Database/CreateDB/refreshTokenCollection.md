*) refresh_token
- Hệ thống sử dụng JWT để xác thực người dùng. Vậy mỗi lần người dùng đnăg nhập thành công sẽ tạo ra 1 JWT access token và 1 refresh token.
- JWT access token thì không cần lưu vào DB, vì chúng ta sẽ cho nó staeless( không lưu vào đâu)
- Còn refresh token thì cần lưu vào database để tăng tính bảo mật
- Một user thì có nhiều refresh token, nên không thể lưu hết vào trong collection 'users' được => quan hệ 1- nhiều
- Vì đôi lúc chúng ta chỉ cần quan tấm đến refresh_token thôi mà không cần biết user là ai. Vậy nên ta tạo ra một collection riêng để lưu refresh token.


interface RefreshToken{
    _id:objectId
    token:string
    created_at:Date
    user_id:objectId
}