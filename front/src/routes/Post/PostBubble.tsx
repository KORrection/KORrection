/* eslint-disable react/no-danger */
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import { deleteApi, putApi } from 'services';
import { IAuthor, IPost } from 'types/board';

import { Favourite } from 'assets/svgs';
import Button from 'routes/_shared/Button';
import TextEditor from 'routes/_shared/TextEditor';
import styles from './post.module.scss';

interface IProps {
  post: IPost;
  author: IAuthor;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const PostBubble = ({ post, author, editorState, setEditorState }: IProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [isLiked, setIsLiked] = useState(false);

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();

    const content = stateToHTML(editorState.getCurrentContent());

    putApi(`board/posts/${params.postId}`, {
      category: post.category,
      title,
      content,
    }).then(() => {
      setIsEditing(false);
      navigate(`/board/${params.postId}`);
    });
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFavouriteClick = () => {
    putApi(`board/posts/${params.postId}/upvotes`)
      .then((res) => {
        setIsLiked((prev) => !prev);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = () => {
    deleteApi(`board/posts/${params.postId}`).then(() => navigate('/board'));
  };

  const handleModifyClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <section className={styles.postContainer}>
      <div className={styles.authorContainer}>
        <img
          src={author.authorPic}
          alt='authorProfileImg'
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://www.yokogawa.com/public/img/default_image.png';
          }}
        />
        <p>{author.authorName}</p>
      </div>
      {isEditing ? (
        <form className={styles.editorWrapper} onSubmit={handlePostSubmit}>
          <div className={styles.titleContainer}>
            <input type='text' name='title' placeholder='글 제목' value={title} onChange={handleInputChange} />
          </div>

          <TextEditor editorState={editorState} setEditorState={setEditorState} />
          <div className={styles.buttonWrapper}>
            <Button type='button' size='large' onClick={handleCancelClick}>
              cancel
            </Button>
            <Button type='submit' size='large' primary>
              save
            </Button>
          </div>
        </form>
      ) : (
        <div className={styles.speechBubble}>
          <div className={styles.subTitleContainer}>
            <div className={styles.categoryContainer}>
              <span className={styles.category}>{post.category}</span>
              {isLiked ? (
                <Favourite fill='#ff453a' stroke='none' onClick={handleFavouriteClick} />
              ) : (
                <Favourite onClick={handleFavouriteClick} />
              )}
              <span>{post.likeCount}</span>
            </div>
            {author.isAuthor && (
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
          <h1 className={styles.title}>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.content} />
          <time>{post.createdAt.substring(0, 10)}</time>
        </div>
      )}
    </section>
  );
};

export default PostBubble;
