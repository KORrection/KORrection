export interface IPost {
  _id: string;
  postId: string;
  authorObjId: string;
  category: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}
