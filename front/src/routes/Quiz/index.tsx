import { useState } from 'react';
import { useMount } from 'react-use';
import { useRecoilState } from 'recoil';

import { userLoginState } from 'states/user';
import { getApi } from 'services/axios';
import { SERVER_URL } from 'constants/index';

import QuizDetail from './QuizDetail';
import LoginRequired from 'routes/_shared/LoginRequired';
import styles from './quiz.module.scss';

const Quiz = () => {
  const [isLoggedIn] = useRecoilState(userLoginState);

  const [quizzes, setQuizzes] = useState([]);
  const [randomIdx, setRandomIdx] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useMount(() => {
    getApi('quizzes').then((res) => setQuizzes(res.data.payload));
  });

  const handleButtonClick = () => {
    setIsSelected(false);
    setRandomIdx(Math.floor(Math.random() * (9 - 0) + 1));
  };

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <LoginRequired />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleBox}>
        <h1>맞춤법 퀴즈 Quiz</h1>
        <p>맞춤법 퀴즈를 풀고 자주 틀리는 맞춤법을 공부해보세요!</p>
      </div>
      <section className={styles.quizContainer}>
        {quizzes.length && (
          <QuizDetail quiz={quizzes[randomIdx]} idx={randomIdx} isSelected={isSelected} setIsSelected={setIsSelected} />
        )}
        <button type='button' onClick={handleButtonClick}>
          Next
        </button>
      </section>
    </div>
  );
};

export default Quiz;
