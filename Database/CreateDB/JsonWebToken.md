I. Authentication là gì?
1. Tại sao cần phải authentication
- Authentication là quá trình xác thực người dùng. Nó giúp chúng ta biết được người dùng là ai, và có quyền truy cập vào các tài nguyên nào
2. Authorization là gì? Khác gì so với authentication
- Authorization là quá trình xác định người dùng có quyền truy cập vào tài nguyên nào. Nó giúp chúng ta biết được người dùng có quyền truy cập vào tài nguyên nào.
- Authorization được hiểu như cấp độ cao hơn authentication, phải xác thực người dùng trước rồi mới xác định được người dùng có quyền truy cập vào tài nguyên nào
3. Luồng hoạt động của authentication
- Dù cho có nhiều phương pháp authentication, nhưng luồng của chúng cơ bản vẫn giống nhau.
- Ví dụ bạn muốn truy cập vào một trang web mà cần đăng nhập:
    + Bước 1: Client sẽ gửi một request lên server chứa thông tin định danh client là ai, cái này có thể là username/password, một đoạn mã nào đấy, hoặc là token, hoặc là một số thông tin khác
    + Bước 2: Server sẽ kiểm tra thông tin định danh của client với thông tin trong database. Nếu thông tin định danh đúng, server sẽ trả về một dấu hiệu gì đó để client biết là đã đăng nhập thành công
    + Bước 3: Client sẽ lưu lại các dấu hiệu này, và gửi dấu hiệu này lên server mỗi khi client muốn truy cập vào các tài nguyên của server
    + Bước 4: Server sẽ kiểm tra dấu hiệu, nếu hợp lệ, server sẽ trả về tài nguyên cần thiết
II. Basic Authentication
1. Định nghĩa và luồng hoạt động 
- được coi là phương pháp authentication đơn giản nhất cho một website
- Luồng hoạt động của phương pháp này được mô tả như sau:
    + Khi bạn truy cập website sử dụng Basic Authentication, server sẽ kiểm tra 'Authorization' trong HTTP header. Nếu 'Authorization' không hợp lệ, server sẽ trả về một response với 'WWW-Authenticate' nằm trong header. Cái này nó sẽ làm website bạn hiển thị popup yêu cầu nhập username/password
    + Bạn nhập username/password thì trình duyệt sẽ tiến hành mã hóa username/password thành chuỗi base64 theo quy tắc 'username:password', và gửi lên server thông qua HTTP header 'Authorization'
    + Server sẽ kiểm tra và giải mã 'Authorization' trong HTTP header. Nếu hợp lệ sẽ trả về thông tin website, nếu không hợp lệ, server sẽ trả về một popup yêu cầu nhập username/password
2. Ưu/nhược điểm của Basic Authentication
- Ưu điểm: Đơn giản, dễ hiểu, dễ triển khai. Làm được trên Nginx hay Apache mà không cần can thiệp vào code backend
- Nhược điểm:
    + Không an toàn, vì username/password được mã hóa bằng base64. 
    + Thiếu tính linh hoạt: Basic Authentication không hỗ trợ nhiều cấp độ xác thực, quản lý quyền truy cập, hay gia hạn/ thu hồi quyền truy cập. Điều này giới hạn khả năng mở rộng và kiểm soát truy cập trong các ứng dụng phức tạp.
    + Không thể logout ra khỏi website mà chỉ khi tắt website đi mới logout
    + Khôgn thể sử dụng cho các ứng dụng mobile
III. Cookie là gì?
- Cookie là một file nhỏ được lưu trữ trên thiết bị user và thường được dùng để lưu thông tin cảu người dùng trên website như: tên, địa chỉ, ...
- Cookie được ghi và đọc theo domain
    Ví dụ:  Khi truy cập vào một website thì server sẽ trả về cookie thì trình duyệt sẽ lưu cookie cho domain đó.
    Khi gửi request đến một website thì trình duyệt sẽ tìm kiếm có cookie nào của website đó hay không và gửi đến server. Nhưng nếu truy cập vào google thì sẽ không đọc được cookie bên website cần tìm kiếm vì trình duyệt không gửi lên
- Một website có thể lưu nhiều cookie khác nhau, ví dụ profile, cart, history
- Bộ nhớ của cookie có giới hạn, nên bạn không lưu quá nhiều thông tin vào cookie. Thường thì một website chỉ nên lưu tối đã 50 cookie và tổng kích thước của các cookie trên webdite đó không nên vượt quá 4kb
1. Cookie được lưu trữ ở đâu
- Được lưu trong file nằm trên ổ cứng
2. Làm sao để ghi đè dữ liệu lên cookie của tình duyệt
Có 3 cách để ghi đề dữ liệu lên cookie:
    - Khi bạn truy cập vào 1 url hoặc gọi 1 api, server có thẻ set cookie lên máy tính của bạn bằng cách trả về header 'Set-Cookie' trong response
    - Bạn có thể dùng javascript để set cookie lên máy tính của bạn thông qua 'document.cookie'
    - Bạn có thể dùng trình duyệt, mở devtool lên và set cookie lên máy tính của bạn
3. Một số lưu ý quan trọng khi sử dụng cookie
*) HttpOnly: Khi set 'HttpOnly' cho một cookie của bạn thì cookie đó sẽ không thể đọc được bằng JS. Điều này giúp tránh được tấn công XSS
- Tấn công XSS hiểu đơn giản là người khác có thể chạy được code js của họ trên trang web của bạn.
- Để set 'HttpOnly' cho cookie, bạn chỉ cần thêm option 'httpOnly:true' và cookie là xong
4. Tấn công CSRF
