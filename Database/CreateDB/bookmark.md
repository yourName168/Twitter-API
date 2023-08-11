- Bookmark các tweet lại, mỗi user không số lượng bookmark. 

interface Bookmark{
    _id:ObjectId
    user_id:ObjectId
    tweet_id:ObjectId
    created_at:Date 
}


interface Like{
    _id:ObjectId
    user_id:ObjectId
    tweet_id:ObjectId
    created_at:Date
}


interface Hastags{
    I-id:ObjectId
    content:string
    created_at:Date
}
