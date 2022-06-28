import { useState } from 'react';
import { useMount } from 'react-use';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

import { getApi } from 'services';
import { userLoginState } from 'states/user';
import { IPost } from 'types/board';

import styles from './post.module.scss';
import PostBubble from './PostBubble';

const POST_INITIAL_STATE = { category: '', createdAt: '', likeCount: 0, title: '', content: '' };
const AUTHOR_INITIAL_STATE = { authorName: '', authorPic: '', isAuthor: false };

const Post = () => {
  const params = useParams();
  const isLoggedIn = useRecoilValue(userLoginState);

  const [post, setPost] = useState<IPost>(POST_INITIAL_STATE);
  const [author, setAuthor] = useState(AUTHOR_INITIAL_STATE);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

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
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  });

  if (!isLoggedIn) {
    window.location.href = 'http://localhost:5001/google';

    return <div>로그인이 필요한 서비스입니다..</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <PostBubble post={post} author={author} editorState={editorState} setEditorState={setEditorState} />
    </div>
  );
};

export default Post;
