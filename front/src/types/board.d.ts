export interface IPost {
  category: string;
  content: string;
  createdAt: string;
  likeCount: number;
  title: string;
  updatedAt?: string;
  _id?: string;
  authorName?: string;
  authorPic?: string;
  postId?: string;
}

export interface IPostDetail {
  authorName: string;
  authorPic: string;
  comments: array;
  post: IPost;
}
