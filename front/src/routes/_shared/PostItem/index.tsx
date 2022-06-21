import { IPost } from 'types/board';

import styles from './postItem.module.scss';

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps) => {
  return (
    <>
      <li className={styles.postCard}>
        <dl>
          <div>
            <dt>카테고리</dt>
            <dd className={styles.subText}>{post.cateory}</dd>
            <dt>글 제목</dt>
            <dd className={styles.mainText}>{post.title}</dd>
          </div>
          <div>
            <dt>작성 날짜</dt>
            <dd className={styles.subText}>{post.createdAt.substring(0, 10)}</dd>
            <dt>작성자</dt>
            <dd className={styles.mainText}>{post.author}</dd>
          </div>
        </dl>
      </li>
      <li className={styles.postCard}>
        <dl>
          <div>
            <dt>카테고리</dt>
            <dd className={styles.subText}>{post.cateory}</dd>
            <dt>글 제목</dt>
            <dd className={styles.mainText}>{post.title}</dd>
          </div>
          <div>
            <dt>작성 날짜</dt>
            <dd className={styles.subText}>{post.createdAt.substring(0, 10)}</dd>
            <dt>작성자</dt>
            <dd className={styles.mainText}>{post.author}</dd>
          </div>
        </dl>
      </li>
    </>
  );
};

export default PostItem;
