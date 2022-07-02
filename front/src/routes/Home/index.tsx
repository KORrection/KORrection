import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cx } from 'styles';

import { currentUserState, userLoginState } from 'states/user';
import { BOARD_IMAGE_URL, GEC_IMAGE_URL } from 'constants/index';
import { getApi } from 'services/axios';

import styles from './home.module.scss';

const Home = () => {
  const [isLoggedIn] = useRecoilState(userLoginState);
  const [userInfo, setUserInfo] = useRecoilState(currentUserState);

  useEffect(() => {
    if (isLoggedIn && userInfo.userEmail === '') {
      getApi('userInfo').then((res) => {
        const { user } = res.data;

        setUserInfo(user);
      });
    }
  }, [isLoggedIn, setUserInfo, userInfo.userEmail]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.indexBox}>
        <h1>당신의 올바른 한국어를 위하여, 코렉션!</h1>
        <p>For the Correct Korean, KORrection!</p>
        <Link to='/gec'>
          <button type='button' className={styles.gecButton}>
            <span>코렉션 사용하기</span>
          </button>
        </Link>
      </div>
      <section className={cx(styles.container, styles.mobileContainer)}>
        <div className={styles.imgContainer}>
          <img src={GEC_IMAGE_URL} alt='gecImg' />
        </div>
        <div className={styles.textContainer}>
          <h2>
            어려웠던 한국어 문법을
            <br />
            고쳐보세요!
          </h2>
          <p>Fix the ambiguous Korean grammar!</p>
          <p>Check grammar, spelling, and punctuation.</p>
        </div>
      </section>
      <section className={cx(styles.container, styles.desktopContainer)}>
        <div className={styles.textContainer}>
          <h2>
            어려웠던 한국어 문법을
            <br />
            고쳐보세요!
          </h2>
          <p>Fix the ambiguous Korean grammar!</p>
          <p>Check grammar, spelling, and punctuation.</p>
        </div>
        <div className={styles.imgContainer}>
          <img src={GEC_IMAGE_URL} alt='gecImg' />
        </div>
      </section>
      <section className={cx(styles.container, styles.secondContainer)}>
        <div className={styles.imgContainer}>
          <img src={BOARD_IMAGE_URL} alt='boardImg' />
        </div>
        <div className={styles.textContainer}>
          <h2>한국어 질문을 해결해 보세요!</h2>
          <p>Feel free to ask Korean phrases!</p>
          <p>Fluent friends will answer your questions.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
