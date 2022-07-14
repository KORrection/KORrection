import { Dispatch, SetStateAction } from 'react';
import { cx } from 'styles';

import { putApi } from 'services/axios';
import { IQuiz } from 'types/quiz';

import styles from './quiz.module.scss';

interface IProps {
  quiz: IQuiz;
  idx: number;
  isSelected: boolean;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}

const QuizDetail = ({ quiz, idx, isSelected, setIsSelected }: IProps) => {
  const handleAnswerClick = () => {
    setIsSelected(true);

    putApi('quiz', {
      idx,
    });
  };

  return (
    <>
      <h2>맞춤법 퀴즈</h2>
      <p className={styles.question}>{quiz.text}</p>
      <button
        type='button'
        className={cx(
          styles.answer,
          { [styles.isSelected]: isSelected },
          isSelected && { [styles.correct]: quiz.answer[0].correct }
        )}
        onClick={handleAnswerClick}
      >
        {quiz.answer[0].text}
      </button>
      <button
        type='button'
        className={cx(
          styles.answer,
          { [styles.isSelected]: isSelected },
          isSelected && { [styles.correct]: quiz.answer[1].correct }
        )}
        onClick={handleAnswerClick}
      >
        {quiz.answer[1].text}
      </button>
      <p className={cx(styles.commentary, { [styles.isSelected]: isSelected })}>{quiz.Commentary}</p>
    </>
  );
};

export default QuizDetail;
