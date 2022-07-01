import { ArrowRight } from 'assets/svgs';

import styles from './gec.module.scss';

interface IProps {
  result: string[];
  originalSentence: string;
}

const Suggestion = ({ result, originalSentence }: IProps) => {
  return (
    <li className={styles.suggestionWrapper}>
      <ul>
        {result.map((res, i) => {
          const key = `suggestion-card-${i}`;

          return (
            <li key={key} className={styles.suggestionCard}>
              <mark className={styles.wrong}>{originalSentence}</mark> <ArrowRight />{' '}
              <mark className={styles.right}>{res}</mark>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Suggestion;
