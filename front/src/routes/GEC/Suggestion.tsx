import { useRecoilState } from 'recoil';

import { gecTextState } from 'states/gec';

import styles from './gec.module.scss';

interface IProps {
  result: string[];
  originalSentence: string;
}

const Suggestion = ({ result, originalSentence }: IProps) => {
  const [gecState, setGecState] = useRecoilState(gecTextState);

  const handleSuggestionClick = (original: string, suggestion: string) => {
    const lastString = suggestion[suggestion.length - 1];
    let newSuggestion = suggestion;

    if (lastString !== '.' && lastString !== '!' && lastString !== '?') {
      newSuggestion = `${suggestion}.`;
    }

    const newGecState = gecState.replace(`${original}.`, newSuggestion);
    setGecState(newGecState);
  };

  return (
    <li className={styles.suggestionWrapper}>
      <mark className={styles.wrong}>{originalSentence}</mark>
      <ul>
        {result.map((res, i) => {
          const key = `suggestion-card-${i}`;

          return (
            <li key={key} className={styles.suggestionCard}>
              <button
                type='button'
                className={styles.suggestionButton}
                onClick={() => handleSuggestionClick(originalSentence, res)}
              >
                <mark className={styles.right}>{res}</mark>
              </button>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Suggestion;
