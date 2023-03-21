import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { AxiosError } from 'axios';

import { getApi } from 'services/axios';
import { IPost } from 'types/board';

import DropDown from 'routes/_shared/DropDown';
import PostItem from 'routes/_shared/PostItem';
import Button from 'routes/_shared/Button';
import styles from './board.module.scss';

const DROPDOWN_CATEGORIES = ['전체', '자유', '한국어 질문'];

const Board = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [filteredposts, setFilteredPosts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('전체');

  useMount(() => {
    getApi('board')
      .then((res) => {
        const newPosts = res.data.payload.posts;

        setPosts(newPosts);
        setFilteredPosts(newPosts);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  });

  useEffect(() => {
    let newFilteredPosts = posts;

    if (currentCategory === '전체') {
      newFilteredPosts = posts;
    } else {
      newFilteredPosts = posts.filter((post: IPost) => post.category === currentCategory);
    }

    setFilteredPosts(newFilteredPosts);
  }, [currentCategory, posts]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleBox}>
        <h1>커뮤니티 Community</h1>
        <p>
          전 세계의 한국어 능력자와 만날 수 있는 코렉션에서
          <br />
          궁금한 점을 해결해 보세요!
        </p>
      </div>
      <section>
        <div className={styles.componentsContainer}>
          <DropDown selectList={DROPDOWN_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
            {currentCategory}
          </DropDown>
          <Link to='write'>
            <Button type='button' size='large'>
              글쓰기
            </Button>
          </Link>
        </div>
        <ul>
          {filteredposts.map((post: IPost) => (
            <PostItem key={post.postId} post={post!} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Board;
