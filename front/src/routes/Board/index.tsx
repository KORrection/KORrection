import { useEffect, useState } from 'react';
import { useMount } from 'react-use';

import { IPost } from 'types/board';
import { getApi } from 'services';

import DropDown from 'routes/_shared/DropDown';
import PostItem from 'routes/_shared/PostItem';
import styles from './board.module.scss';

const DROPDOWN_CATEGORIES = ['전체', '자유', '한국어 질문', 'K-pop', 'K-drama'];

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [filteredposts, setFilteredPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('전체');

  useMount(() => {
    getApi('board').then((res) => {
      const newPosts = res.data.payload.posts;

      setPosts(newPosts);
      setFilteredPosts(newPosts);
    });
  });

  return (
    <section className={styles.pageContainer}>
      <div className={styles.titleBox}>
        <h1>커뮤니티 Community</h1>
        <p>
          전 세계의 한국어 능력자와 만날 수 있는 코렉션에서
          <br />
          궁금한 점을 해결해 보세요!
        </p>
      </div>
      <article>
        <DropDown selectList={DROPDOWN_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
          {currentCategory}
        </DropDown>
        <ul>
          {filteredposts.map((post: IPost) => (
            <PostItem key={post.postId} post={post} />
          ))}
        </ul>
      </article>
    </section>
  );
};

export default Board;
