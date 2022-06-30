import { ArrowRight } from 'assets/svgs';

import styles from './gec.module.scss';

interface IProps {
  result: string[];
}

const Suggestion = ({ result }: IProps) => {
  return (
    <li>
      <ul className={styles.suggestionWrapper}>
        {result.map((res, i) => {
          const key = `suggestion-card-${i}`;

          return (
            <li key={key} className={styles.suggestionCard}>
              <mark className={styles.wrong}>틀린 내용</mark> <ArrowRight /> <mark className={styles.right}>{res}</mark>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Suggestion;
