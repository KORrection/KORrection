/* eslint-disable react/no-danger */
import { useState, FormEvent } from 'react';
import { useMount } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { stateToHTML } from 'draft-js-export-html';

import { deleteApi, getApi, putApi } from 'services';
import { userLoginState } from 'states/user';
import { IPost } from 'types/board';

import { Favourite } from 'assets/svgs';
import TextEditor from 'routes/_shared/TextEditor';
import Button from 'routes/_shared/Button';
import styles from './post.module.scss';

const POST_INITIAL_STATE = { category: '', createdAt: '', likeCount: 0, title: '', content: '' };
const AUTHOR_INITIAL_STATE = { authorName: '', authorPic: '', isAuthor: false };

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(userLoginState);

  const [post, setPost] = useState<IPost>(POST_INITIAL_STATE);
  const [author, setAuthor] = useState(AUTHOR_INITIAL_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useMount(() => {
    getApi(`board/posts/${params.postId}`)
      .then((res) => {
        const { authorName, authorPic, post: newPost, isAuthor } = res.data.payload;
        console.log(res.data.payload);
        const blocksFromHtml = htmlToDraft(newPost.content);

        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          const editor = EditorState.createWithContent(contentState);
          setEditorState(editor);
        }

        setPost(newPost);
        setAuthor({ authorName, authorPic, isAuthor });
        setTitle(newPost.title);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });

  if (!isLoggedIn) {
    window.location.href = 'http://localhost:5001/google';

    return <div>로그인이 필요한 서비스입니다..</div>;
  }

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
    <div className={styles.pageContainer}>
      <section className={styles.postContainer}>
        <div className={styles.authorContainer}>
          <img src={author.authorPic} alt='authorProfileImg' />
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
                  <Favourite fill='tomato' stroke='none' onClick={handleFavouriteClick} />
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
    </div>
  );
};

export default Post;
