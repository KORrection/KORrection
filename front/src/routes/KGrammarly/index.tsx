import { ArrowRight, Comment, Document } from 'assets/svgs';
import { ChangeEvent, useState } from 'react';
import styles from './kGrammarly.module.scss';

const KGrammarly = () => {
  const [textValue, setTextValue] = useState('');

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(e.currentTarget.value);
  };

  return (
    <section className={styles.pageContainer}>
      <div className={styles.container}>
        <div className={styles.title}>
          <Comment />
          <h2>Document</h2>
        </div>
        <div className={styles.textContainer}>
          <textarea
            className={styles.grammarlyText}
            placeholder='내용을 입력해주세요'
            maxLength={500}
            value={textValue}
            onChange={handleValueChange}
          />
          <div className={styles.textLength}>
            <span>{textValue.length}</span>
            <span> / 500</span>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <Document />
          <h2>All Suggestions</h2>
        </div>
        <ul>
          <li className={styles.suggestionCard}>
            <mark className={styles.wrong}>틀린 내용</mark> <ArrowRight />{' '}
            <mark className={styles.right}>맞는 내용</mark>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default KGrammarly;
