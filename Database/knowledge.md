1. Cơ sở dư liệu căn bản
- Cơ sở dữ liệu là nơi lưu dữ liệu như: gg sheet, mySQL, MongoDB,...
- Tại sao lại cần có cơ sở dữ liệu:
    + Do khi sử dụng qua hàng năm thì dữ liệu sẽ ngày một phình to ra và nếu như lưu trong file json thì không đủ đáp ứng nhu cầu sử dụng
    -> Vậy nên cần một hệ quản trị cơ sở dữ liệu để giúp quản lý việc đọc và ghi thuận tiện hơn
- Một số hệ quản trị CSDL:
    + SQL: MySQL, Oracle,..
    + NoSQL: MongoDB, DyamoDB, ...
    + No-Code & Other: Gg sheet
2. So sánh SQL và NoSQL
*) SQL: Cơ sở dữ liệu quan hệ:
- Học 1 ngôn ngữ nhưng dùng được ở nhiều cơ sở dữ liệu khác nhau
- Schema chặt chẽ
- Khuyến khích các tiêu chuẩn hóa để giảm thiểu sự dư thừa dữ liệu
- Có thể mở rộng nhưng hơi tốn công
*) NoSQL:
- Dữ liệu được lưu dưới dạng JSON
- Không cần schema, lưu được hầu như bất cứ thứ gì
- Hiệu năng tốt, mở rộng theo chiều ngang dễ dàng


Ví dụ:
- Dùng SQL:
    xây dụng hệ thống dữ liệu cho danh bạ. 
3. MongoDB cơ bản
- Là một hệ quản trị CSDL NoSQL
- Ra đời năm 2007, được sử dụng rộng rãi trên toàn thế giới, có thể coi là một trong những CSDL NoSQL được sủe dụng nhiều nhất hiện nay
- Thay vì lưu trong từng hàng hay cột như SQL, MongoDB dùng document theo dạng BJSON. Ứng dụng có thể lấy data theo dạng JSON

*) Cài đặt mongoDB:
- Tải về máy và cài trên local
- Dùng trên cloud

- Cấp độ trong mongoDB:
    + Cao nhất là Organizatión
    + 1 Organization có nhiều Prject
    + 1 Prject có nhiều Cluster
    + 1 Cluster có nhiều Database
    + 1 Database có nhiều collection
    + 1 collection có nhiều document

*) Một số cách kết nối tới MongoDB
- Dùng Mongo compass
- Dùng MongoSH(terminal)
- Dùng MongoDriver(SDK tích hợp vào code)
- Dùng Extension MongoDB cho VS code
    

4. Cách thiết kế CSDL như thế nào với database là MongoDB
- Thiết kế CSDL hay còn gọi là thiết kế MongoDB schema
- Có nhiều yếu tố ảnh hướng tới schema:
    + Ứng dụng có tính chất đọc hay ghi nhiều
    + Dữ liệu nào thường được truy cập cùng nhau
    + Các yếu tố về hiệu suất của bạn sẽ như thế nào
    + Dữ liệu của bạn sẽ tăng hay mở rộng như thế nào
*) Cách tiếp cận thiết kế cơ sở dữ liệu - Relational vs MongoDB
- Với các thiết kế bên MongoDB(NoSQL) sẽ:
    + Không có quy trình chính thức
    + Không có những thuật toán
    + Không có những quy tắc
- Khi thiết kế CSDL chúng ta nên quan tâm:
    + lưu data ở đâu, như thế nào
    + CUng cấp hiệu tốt khi truy vấn
    + Yêu cầu về phần cứng có hợp lí không


5. Nhúng và tham chiếu
*) Nhúng: là đưa hết data vào trong 1 document
    - Ưu điểm:
        + Có thể truy xuất cả thông tin liên quan trong một query
        + Tránh việc join hoặc lookup trong ứng dụng
        + Update các thông tin liên quan trong một query duy nhất
    - Hạn chế: 
        + Khi document lớn lên sẽ gây gánh nặng cho các trường không liên quan
        + Giới hạn cho document là 16 MB trong MongoDB. Nếu bạn nhúng quá nhiều dữ liệu bên trong một document duy nhất sẽ có khả năng chạm tới giới hạn này
*) Tham chiếu là tách riêng ra từng collection riêng biệt(khi sử dụng tham chiếu thì ta sử dụng khóa ngoại và toán tử $lookup), cho phép chúng ta chia dữ liệu để tạo ra các truy vấn và có thể mở rộng hơn:
    - Ưu điểm:
        + Bằng cách chia sẻ dữ liệu, bạn sẽ có nhiều document nhỏ
        + Ít có khả năng đạt giới hạn 16MB cho mỗi document
        + Những dữ liệu không cần thiết sẽ không được đính kèm với các truy vấn
        + GIảm lượng trùng lặp dữ liệu. Tuy nhiên, điều quan trọng cần lưu ý là đôi khi chúng ta chấp nhận trùng lặp dữ liệu để đem đến một schema tốt hơn
    - Hạn chế: Để truy xuất được he1ét data cần sử dụng tốt thiểu 2 query hoặc sử dụng $lookup
6. Các loại quan hệ
a. Quan hệ 1-1:
- Ví dụ 1 người dùng thì chỉ có 1 email đăng kí duy nhất, thì đây là quan hệ 1-1
- Chúng ta có thể mô hình hóa quan hệ 1-1 bằng cặp key-value trong database
    EX:
        {
            "email":"hieule1235@gmail.com",
        }
b. Quan hệ 1-ít(one to few)
- Ví dụ một người sẽ có vài địa chỉ nhận hàng trên shoppe, thì đây là quan hệ 1 - ít
- Chúng ra có thể nhúng array bên trong object User
    EX:
        {
            "email":"hieule1235@gmail.com",
            "address":[
                "Home":"Lâm Thao-Phú Thọ",
                "Bussiness":"PTIT"
            ]
        }
    *) Quy tắc 1: Ưu tiên nhúng trừ khi chúng ta có lý do thuyết phục để không làm như vậy
c. Quan hệ 1- nhiều(one to many)
- Ví dụ: 1 chiếc xe đạp được cấu tạo bởi nhiều thành phần khác nhau, thì đây là quan hệ 1 nhiều
- Giải pháp là tách những thành phần kia thành một collection riêng biệt gọi là Parts. Products và Parts sẽ liên kết với nhau thông qua id

    EX: Collection Products:
        {
            "name": "left-handed smoke shifter",
            "manufacturer": "Acme Corp",
            "catalog_number": "1234",
             "parts": ["ObjectID('AAAA')", "ObjectID('BBBB')", "ObjectID('CCCC')"]
        }

        Collection Parts:
        {
            "_id": "ObjectID('AAAA')",
            "partno": "123-aff-456",
            "name": "#4 grommet",
            "qty": "94",
            "cost": "0.94",
            "price": " 3.99"
        }
    *) Quy tắc 2: Khi cần truy cập vào một đối tượng riêng biệt thì không phải lúc dùng nhúng
    *) Quy tắc 3: tránh join/lookups nếu có thể, những cũng đừng sợ nếu nó giúp chúng ta có một schema tốt hơn
d. Quan hệ 1 - rất nhiều
- Ví dụ mỗi máy chủ có thể lưu trữ hàng tỉ message log. Nếu dùng array trong MongoDB, cho dù đã dùng array Object ID thì cũng có khả năng chạm đến giới hạn 16MB cho document. Vậy nên chúng ta cần suy nghĩ lại cách thiết kế làm sao cho khi DB phình to ra vẫn không chạm tới giới hạn.
- Cách giải quyết là trong từng message log thì chúng ta lưu ID của server/host mà nó thuộc về khi đó sẽ giảm tải dữ liệu ghi trong document của host và sẽ không lo bị chạm tới giới hạn.
    EX: Hosts:
        {
            "_id": ObjectID("AAAB"),
            "name": "goofy.example.com",
            "ipaddr": "127.66.66.66"
        }
        Log Message:
        {
            "time": ISODate("2014-03-28T09:42:41.382Z"),
            "message": "cpu is on fire!",
            "host": ObjectID("AAAB")
        }
    *) Quy tắc 4: Array không nên phát triển không giới hạn. Nếu có hơn vài trăm document ở phía "nhiều" thì đừng nhúng chúng. Nếu có hơn vài ngàn document ở phía "nhiều" thì đừng sử dụng array ObjectID tham chiếu. Mảng với số lượng lớn item là lý do không nên dùng nhúng
e. Quan hệ nhiều - nhiều
- Sử dụng array ObjectID
        EX: 
        Users:
        {
            "_id": ObjectID("AAF1"),
            "name": "Kate Monster",
            "tasks": [ObjectID("ADF9"), ObjectID("AE02"), ObjectID("AE73")]
        }
        Tasks:
        {
            "_id": ObjectID("ADF9"),
            "description": "Write blog post about MongoDB schema design",
            "due_date": ISODate("2014-04-01"),
            "owners": [ObjectID("AAF1"), ObjectID("BB3G")]
        }
    *) Quy tắc 5: Với MongoDB, cách bạn mô hình hóa dữ liệu phụ thuộc vào cách sử dụng dữ liệu. Bạn muốn cấu trúc dữ liệu của bạn phù hợp với cách mà ứng dụng truy vấn và cập nhật
    