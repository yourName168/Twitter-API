*) Follower:
- Một người dùng có thể follow rất nhiều user khác, nếu dùng 1 mảng 'following' chứa ObjectId trong collection 'user' thì không tối ưu. Vì dễ chạm đến giới hạn 16MB
- Nếu dùng mảng 'following' thì khi muốn tìm kiếm user A đang follow ai rất dễ nhưng ngược lại, tìm kiếm ai đang follow user A thì lại rất khó.
- Vậy nên ta tạo ra một collection riêng lưu các mối quan hệ follow giữa các user là hợp lý hơn cả
- 1 user có rất nhiều follower và cũng người nhiều following nên đây là quan hệ nhiều - nhiều

    interface Follower{
        _id:objectId
        user_id:objectId
        following:objectId
        created_at:Date
    }