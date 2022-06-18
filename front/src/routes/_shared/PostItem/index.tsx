import { IPost } from 'types/board';

import styles from './postItem.module.scss';

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps) => {
  return (
    <li>
      <p>{post.category}</p>
      <p>{post.title}</p>
      <p>{post.createdAt}</p>
      <p>{post.author}</p>
    </li>
  );
};

export default PostItem;
