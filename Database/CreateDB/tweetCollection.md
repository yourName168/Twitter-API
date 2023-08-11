- Do một người có thể tạo ra rất nhiều tweet nên không thể lưu vào trong collection 'user' mà nên tạo thành một collection riêng rồi tham chiếu tới 'user'
    Các chức năng sẽ clone của tweet
- Tweet có thể chứa text, hastags, mentions, ảnh, video
- Tweet có thể hiển thị cho everyone hoặc twitter circle
- Tweet có thể quy định người reply

- tweet sẽ có nested tweet, nghĩa là tweet có thể chứa tweet bên trong. Ta sẽ lưu trường 'parent_id' để biết tweet này là con của của ai. nếu là 'null' thì tweet đó là gốc.

interface Tweet{
    _id:ObjectId
    user_id:ObjectId
    type:TweetType
    audience:TweetAudience//(đối tượng thấy được tweet)
    conten:string
    parent_id:ObjectId|null
    hastag:ObjectId[]
    mentions:ObjectId[]//là việc gắn thẻ bài viết cho ai đó và nhận vào là user_id
    media:Media[]
    guest_views:number//số người xem khi không đăng nhập
    user_views:number// xem khi đăng nhập
    created_at:Date
    updated_at:Date

}
interface Media{
    url:string
    type:MediaType
}
enum MediaType{
    image,
    video
}
enum TweetType{
    Tweet,
    Retweet(chia sẻ bài viết không kèm nội dung),
    comment,
    QuoteTweet(chia sẻ có thêm nội dung của mình)
}
enum TweetAudience{
    Everyone,
    TweetCircle
}