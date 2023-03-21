import { ChangeEvent, FormEvent, useState } from 'react';
import { useMount } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { AxiosError } from 'axios';

import { getApi, postApi } from 'services/axios';
import { IPost } from 'types/board';
import { convertHtmlToDraft } from 'utils/convertPost';

import Button from 'routes/_shared/Button';
import PostBubble from './SpeechBubble/PostBubble';
import CommentBubble from './SpeechBubble/CommentBubble';
import styles from './post.module.scss';

const POST_INITIAL_STATE = null;
const AUTHOR_INITIAL_STATE = { authorName: '', authorPic: '', isAuthor: false };
const COMMENT_INITIAL_STATE = [
  { _id: '', author: '', authorPic: '', commentId: '', commentBody: '', createdAt: '', isAuthor: false },
];

const Post = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [post, setPost] = useState<IPost | null>(POST_INITIAL_STATE);
  const [author, setAuthor] = useState(AUTHOR_INITIAL_STATE);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [comments, setComments] = useState(COMMENT_INITIAL_STATE);
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  useMount(() => {
    getApi(`board/posts/${params.postId}`)
      .then((res) => {
        const {
          authorName,
          authorPic,
          post: newPost,
          isAuthor,
          comments: newComments,
          isLike: newIsLiked,
        } = res.data.payload;

        setAuthor({ authorName, authorPic, isAuthor });
        setPost(newPost);
        setEditorState(convertHtmlToDraft(newPost.content));
        setComments(newComments);
        setIsLiked(newIsLiked);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.currentTarget.value);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();

    postApi(
      'board/comments',
      {
        commentBody: commentInput,
      },
      {
        params: {
          pId: params.postId,
        },
      }
    ).then((res) => {
      setComments((prev) => [...prev, res.data.payload]);
      setCommentInput('');
    });
  };

  if (!post || isLiked === null) {
    return null;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleContainer}>
        <h1>커뮤니티 Community</h1>
      </div>
      <PostBubble
        post={post}
        setPost={setPost}
        author={author}
        editorState={editorState}
        setEditorState={setEditorState}
        isLiked={isLiked}
      />
      {comments.map((comment) => (
        <CommentBubble key={comment.commentId} comment={comment} />
      ))}
      <form className={styles.commentInputWrapper} onSubmit={handleCommentSubmit}>
        <textarea value={commentInput} onChange={handleCommentChange} className={styles.commentInput} />
        <Button type='submit' size='large'>
          Comment
        </Button>
      </form>
    </div>
  );
};

export default Post;
