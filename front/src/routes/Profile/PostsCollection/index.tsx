import { useEffect, useState } from 'react';
import { useMount } from 'react-use';
import { useRecoilState } from 'recoil';

import { getApi } from 'services/axios';
import { currentUserState } from 'states/user';
import { IComment, IPost } from 'types/board';

import DropDown from 'routes/_shared/DropDown';
import PostItem from 'routes/_shared/PostItem';
import SideMenu from '../SideMenu';
import CommentBubble from 'routes/Post/SpeechBubble/CommentBubble';
import styles from './postsCollection.module.scss';

const DROPDOWN_ITEMS = ['내가 쓴 글', '내가 쓴 댓글', '좋아요한 글'];

const PostsCollection = () => {
  const [userInfo] = useRecoilState(currentUserState);

  const [dropdownSelect, setDropdownSelect] = useState('내가 쓴 글');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const [myComments, setComments] = useState<IComment[]>([]);
  const [myFavourites, setMyFavourites] = useState<IPost[]>([]);

  useMount(() => {
    const loadData = async () => {
      const { data: myPostsData } = await getApi(`board/posts`, {
        params: {
          user: userInfo.userObjId,
        },
      });
      const { data: myCommentsData } = await getApi(`board/comments`, {
        params: {
          user: userInfo.userObjId,
        },
      });
      const { data: myFavouritesData } = await getApi(`board/upvotes`, {
        params: {
          user: userInfo.userObjId,
        },
      });

      const { posts: myPostsRes } = myPostsData.payload;
      const { comments: myCommentsRes } = myCommentsData.payload;
      const { Upvotes: myFavouritesRes } = myFavouritesData.payload;

      setMyPosts(myPostsRes);
      setComments(myCommentsRes);
      setMyFavourites(myFavouritesRes);
    };

    loadData();
  });

  useEffect(() => {
    if (myPosts.length !== 0) {
      if (dropdownSelect === '내가 쓴 글') {
        setPosts(myPosts);
      } else if (dropdownSelect === '좋아요한 글') {
        setPosts(myFavourites);
      }
    }
  }, [dropdownSelect, myPosts, myComments, myFavourites, posts]);

  return (
    <div className={styles.pageContainer}>
      <SideMenu />
      <section>
        <DropDown selectList={DROPDOWN_ITEMS} setCurrentSelect={setDropdownSelect} size='medium'>
          {dropdownSelect}
        </DropDown>
        <ul className={styles.myPostsUl}>
          {dropdownSelect !== '내가 쓴 댓글' &&
            posts.map((post) => {
              const key = post.postId;

              return <PostItem key={key} post={post} />;
            })}
          {dropdownSelect === '내가 쓴 댓글' &&
            myComments.map((comment) => {
              const key = `${comment.commentId}`;

              return <CommentBubble key={key} comment={comment} />;
            })}
        </ul>
      </section>
    </div>
  );
};

export default PostsCollection;
