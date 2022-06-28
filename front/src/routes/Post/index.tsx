import { ChangeEvent, FormEvent, useState } from 'react';
import { useMount } from 'react-use';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { EditorState } from 'draft-js';

import { getApi, postApi } from 'services/axios';
import { userLoginState } from 'states/user';
import { IComment, IPost } from 'types/board';
import { convertHtmlToDraft } from 'utils/convertPost';
import { SERVER_URL } from 'constants/index';

import styles from './post.module.scss';
import PostBubble from './SpeechBubble/PostBubble';
import CommentBubble from './SpeechBubble/CommentBubble';
import Button from 'routes/_shared/Button';

const POST_INITIAL_STATE = { category: '', createdAt: '', likeCount: 0, title: '', content: '' };
const AUTHOR_INITIAL_STATE = { authorName: '', authorPic: '', isAuthor: false };
const COMMENT_INITIAL_STATE = [
  { _id: '', author: '', authorPic: '', commentId: '', commentBody: '', createdAt: '', isAuthor: false },
];

const Post = () => {
  const params = useParams();
  const isLoggedIn = useRecoilValue(userLoginState);

  const [post, setPost] = useState<IPost>(POST_INITIAL_STATE);
  const [author, setAuthor] = useState(AUTHOR_INITIAL_STATE);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [comments, setComments] = useState<IComment[]>(COMMENT_INITIAL_STATE);
  const [commentInput, setCommentInput] = useState('');

  useMount(() => {
    getApi(`board/posts/${params.postId}`)
      .then((res) => {
        const { authorName, authorPic, post: newPost, isAuthor, comments: newComments } = res.data.payload;

        setEditorState(convertHtmlToDraft(newPost.content));
        setPost(newPost);
        setAuthor({ authorName, authorPic, isAuthor });
        setComments(newComments);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <div>로그인이 필요한 서비스입니다..</div>;
  }

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.currentTarget.value);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await postApi(
        'board/comments',
        {
          commentBody: commentInput,
        },
        {
          params: {
            pId: params.postId,
          },
        }
      );
      console.log(res);
      const { data } = await getApi('board/comments', {
        params: {
          pId: params.postId,
        },
      });

      setCommentInput('');
      setComments(data.payload.comments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <PostBubble
        post={post}
        setPost={setPost}
        author={author}
        editorState={editorState}
        setEditorState={setEditorState}
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
