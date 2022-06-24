export interface IPost {
  _id: string;
  id?: string;
  postId?: string;
  authorObjId?: string;
  category: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBoard {
  authorName: string;
  comments: array;
  post: IPost;
}
