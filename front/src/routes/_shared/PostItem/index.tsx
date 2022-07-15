import { useNavigate } from 'react-router-dom';
import { IPost } from 'types/board';

import styles from './postItem.module.scss';

interface IProps {
  post: IPost;
}

const PostItem = ({ post }: IProps) => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(`/board/${post.postId}`);
  };

  return (
    <li>
      <button type='button' className={styles.postCard} onClick={handleBtnClick}>
        <dl>
          <div className={styles.leftContainer}>
            <dt>카테고리</dt>
            <dd className={styles.subText}>{post.category}</dd>
            <dt>글 제목</dt>
            <dd className={styles.mainText}>{post.title}</dd>
          </div>
          <div className={styles.rightContainer}>
            <dt>작성 날짜</dt>
            <dd className={styles.subText}>{post.createdAt.substring(0, 10)}</dd>
            <dt>작성자</dt>
            <dd className={styles.mainText}>{post.authorName}</dd>
          </div>
        </dl>
      </button>
    </li>
  );
};

export default PostItem;
