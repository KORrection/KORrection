/* eslint-disable react/no-danger */
import { Default } from 'assets/images';
import { useState, useMount } from 'hooks';
import { useParams } from 'react-router-dom';

import { getApi } from 'services';
import { IPost } from 'types/board';

import styles from './post.module.scss';

const Post = () => {
  const params = useParams();

  const [post, setPost] = useState<IPost>({ category: '', createdAt: '', likeCount: 0, title: '', content: '' });
  const [author, setAuthor] = useState({ authorName: '', authorPic: '' });

  useMount(() => {
    getApi(`board/posts/${params.postId}`)
      .then((res) => {
        const { authorName, authorPic, post: newPost } = res.data.payload;

        setPost(newPost);
        setAuthor({ authorName, authorPic });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.authorContainer}>
        <img src={Default} alt='authorProfileImg' />
        <p>{author.authorName}</p>
      </div>
      <div className={styles.speechBubble}>
        <p className={styles.category}>{post.category}</p>
        <h1 className={styles.title}>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.content} />
        <p>{post.likeCount}</p>
        <p>{post.createdAt.substring(0, 10)}</p>
      </div>
    </div>
  );
};

export default Post;
