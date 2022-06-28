/* eslint-disable react/no-danger */
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { deleteApi, putApi } from 'services/axios';
import { IComment } from 'types/board';
import { IMAGE_ON_ERROR_URL } from 'constants/index';

import Button from 'routes/_shared/Button';
import styles from './speechBubble.module.scss';

interface IProps {
  comment: IComment;
}

const CommentBubble = ({ comment }: IProps) => {
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [localComment, setLocalComment] = useState<IComment>(comment);
  const [isDeleted, setIsDeleted] = useState(false);
  const [commentInput, setCommentInput] = useState(comment.commentBody);

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();

    putApi(
      `board/comments/${comment.commentId}`,
      {
        commentBody: commentInput,
      },
      {
        params: {
          pId: params.postId,
        },
      }
    ).then((res) => {
      const { commentBody } = res.data.payload.comment;

      setLocalComment((prev) => ({ ...prev, commentBody }));
      setIsEditing(false);
    });
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.currentTarget.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    deleteApi(`board/comments/${comment.commentId}`, {
      params: {
        pId: params.postId,
      },
    }).then(() => setIsDeleted(true));
  };

  const handleModifyClick = () => {
    setIsEditing((prev) => !prev);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <section className={styles.postContainer}>
      <div className={styles.authorContainer}>
        <img
          src={comment.authorPic}
          alt='authorProfileImg'
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = IMAGE_ON_ERROR_URL;
          }}
        />
        <p>{comment.author}</p>
      </div>
      {isEditing ? (
        <form className={styles.commentInputWrapper} onSubmit={handleCommentSubmit}>
          <textarea value={commentInput} onChange={handleCommentChange} className={styles.commentInput} />
          <div className={styles.buttonWrapper}>
            <Button type='button' size='large' onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type='submit' size='large'>
              Comment
            </Button>
          </div>
        </form>
      ) : (
        <div className={styles.speechBubble}>
          <div dangerouslySetInnerHTML={{ __html: localComment.commentBody }} className={styles.content} />
          <div className={styles.subTitleContainer}>
            <time>{comment.createdAt.substring(0, 10)}</time>
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
        </div>
      )}
    </section>
  );
};

export default CommentBubble;
