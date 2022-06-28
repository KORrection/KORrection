/* eslint-disable react/no-danger */
import { useState } from 'react';
import Button from 'routes/_shared/Button';
import { IComment } from 'types/board';

import styles from './speechBubble.module.scss';

interface IProps {
  comment: IComment;
}

/** author: string;
  authorPic: string;
  commentId: string;
  commentBody: string;
  isAuthor: boolean;
  createdAt: string; */

const CommentBubble = ({ comment }: IProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () => {
    console.log('delete button click');
  };

  const handleModifyClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className={styles.postContainer}>
      <div className={styles.authorContainer}>
        <img
          src={comment.authorPic}
          alt='authorProfileImg'
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://www.yokogawa.com/public/img/default_image.png';
          }}
        />
        <p>{comment.author}</p>
      </div>
      <div className={styles.speechBubble}>
        <div className={styles.subTitleContainer}>
          {comment.isAuthor && (
            <div className={styles.buttonWrapper}>
              <Button type='button' size='small' onClick={handleDeleteClick}>
                삭제
              </Button>
              <Button type='button' size='small' onClick={handleModifyClick}>
                수정
              </Button>
            </div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.commentBody }} className={styles.content} />
        <time>{comment.createdAt.substring(0, 10)}</time>
      </div>
    </section>
  );
};

export default CommentBubble;
