import { useState, useMount } from 'hooks';
import { useParams } from 'react-router-dom';

import { getApi } from 'services';
import { IBoard } from 'types/board';

import styles from './post.module.scss';

const Post = () => {
  const params = useParams();

  const [post, setPost] = useState<IBoard>();

  useMount(() => {
    getApi(`board/posts/${params.postId}`)
      .then((res) => setPost(res.data.payload))
      .catch((err) => console.error(err));
  });

  /**  _id: string;
  category: string;
  title: string;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string; */

  return (
    <div className={styles.pageContainer}>
      <div className={styles.speechBubble}>
        <p>{post?.post?.title}</p>
        <p>{post?.authorName}</p>
        <p>{post?.post?.category}</p>
        <p>{post?.post?.content}</p>
        <p>{post?.post?.likeCount}</p>
        <p>{post?.post?.createdAt}</p>
      </div>
    </div>
  );
};

export default Post;
