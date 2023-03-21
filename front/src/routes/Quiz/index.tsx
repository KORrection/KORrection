import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'react-use';
import { AxiosError } from 'axios';

import { getApi } from 'services/axios';

import QuizDetail from './QuizDetail';
import styles from './quiz.module.scss';

const Quiz = () => {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [randomIdx, setRandomIdx] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  useMount(() => {
    getApi('quizzes')
      .then((res) => setQuizzes(res.data.payload))
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  });

  const handleButtonClick = () => {
    setIsSelected(false);
    setRandomIdx(Math.floor(Math.random() * (9 - 0) + 1));
  };

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
        <button type='button' disabled={!isSelected} onClick={handleButtonClick}>
          Next
        </button>
      </section>
    </div>
  );
};

export default Quiz;
