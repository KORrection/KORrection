/* eslint-disable react/no-danger */
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import { deleteApi, putApi } from 'services/axios';
import { IAuthor, IPost } from 'types/board';
import { IMAGE_ON_ERROR_URL } from 'constants/index';

import { Favourite } from 'assets/svgs';
import Button from 'routes/_shared/Button';
import TextEditor from 'routes/_shared/TextEditor';
import styles from './speechBubble.module.scss';

interface IProps {
  post: IPost;
  setPost: Dispatch<SetStateAction<IPost | null>>;
  author: IAuthor;
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
  isLiked: boolean;
}

const PostBubble = ({ post, setPost, author, editorState, setEditorState, isLiked: isLikedPost }: IProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [isLiked, setIsLiked] = useState(isLikedPost);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handlePostSubmit = (e: FormEvent) => {
    e.preventDefault();

    const content = stateToHTML(editorState.getCurrentContent());

    putApi(`board/posts/${params.postId}`, {
      category: post.category,
      title,
      content,
    }).then((res) => {
      const { content: newContent, title: newTitle } = res.data.payload;

      setPost((prev) => {
        if (prev) {
          return { ...prev, title: newTitle, content: newContent };
        }
        return null;
      });
      setTitle(newTitle);
      setIsEditing(false);
    });
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFavouriteClick = () => {
    if (isLiked) {
      putApi(`board/posts/${params.postId}/devotes`).then(() => {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      });
    } else {
      putApi(`board/posts/${params.postId}/upvotes`).then(() => {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      });
    }
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
            e.currentTarget.src = IMAGE_ON_ERROR_URL;
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
              <span>{likeCount}</span>
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
