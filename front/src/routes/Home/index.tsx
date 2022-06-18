import { Link } from 'react-router-dom';

import { Default } from 'assets/images';
import styles from './home.module.scss';
import { cx } from 'styles';

const Home = () => {
  return (
    <section className={styles.pageContainer}>
      <div className={styles.indexBox}>
        <h1>당신의 올바른 한국어를 위하여, 코렉션!</h1>
        <p>For the Correct Korean, KORrection!</p>
        <Link to='/gec'>
          <button type='button'>코렉션 사용하기</button>
        </Link>
      </div>
      <div className={styles.container}>
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
          <img src={Default} alt='defaultImg' />
        </div>
      </div>
      <div className={cx(styles.container, styles.secondMobileContainer)}>
        <div className={styles.textContainer}>
          <h2>한국어 질문을 해결해 보세요!</h2>
          <p>Feel free to ask Korean phrases!</p>
          <p>Fluent friends will answer your questions.</p>
        </div>
        <div className={styles.imgContainer}>
          <img src={Default} alt='defaultImg' />
        </div>
      </div>
      <div className={cx(styles.container, styles.secondDesktopContainer)}>
        <div className={styles.imgContainer}>
          <img src={Default} alt='defaultImg' />
        </div>
        <div className={styles.textContainer}>
          <h2>한국어 질문을 해결해 보세요!</h2>
          <p>Feel free to ask Korean phrases!</p>
          <p>Fluent friends will answer your questions.</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2>매일 매일 한국어 퀴즈를 풀어보세요!</h2>
          <p>Have your Korean Quiz Time EVERYDAY!</p>
          <p>Helpful for skill up your Korean fluency.</p>
        </div>
        <div className={styles.imgContainer}>
          <img src={Default} alt='defaultImg' />
        </div>
      </div>
    </section>
  );
};

export default Home;
