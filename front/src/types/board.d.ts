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

export interface IComment {
  _id: string;
  author: string;
  authorPic: string;
  commentId: string;
  commentBody: string;
  isAuthor: boolean;
  createdAt: string;
}

export interface IPostDetail {
  authorName: string;
  authorPic: string;
  comments: IComment;
  post: IPost;
  isAuthor: boolean;
}

export interface IAuthor {
  authorName: string;
  authorPic: string;
  isAuthor: boolean;
}
