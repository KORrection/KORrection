/* eslint-disable react/no-danger */
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { deleteApi, putApi } from 'services/axios';
import { IComment } from 'types/board';

import Button from 'routes/_shared/Button';
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
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);
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
    ).then(() => {
      /** data:
            payload:
              comment:
              authorObjId: "62b43a24ba416653fc32121d"
              commentBody: "댓글 테스트22dd"
              commentId: "[c]mtbO_maDI5Rtziwbm4bvr"
              createdAt: "2022-06-28T09:09:07.772Z"
              isDeleted: false
              likeCount: 0
              parentPostId: "FCwWAm1jf2veAHLldLnof"
              parentPostObjId: "62b56e0fbf875b81e9eaf06d"
              updatedAt: "2022-06-28T10:01:41.223Z"
              __v: 0
              _id: "62bac533f34c3dc255793a70" */
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
    }).then(
      (res) => console.log(res)
      /** data:
            payload:
              isDeleted:
                isDeleted: true
                message: "댓글이 삭제되었습니다." */
    );
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
          <div dangerouslySetInnerHTML={{ __html: comment.commentBody }} className={styles.content} />
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
