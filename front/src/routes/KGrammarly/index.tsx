import styles from './kGrammarly.module.scss';

const KGrammarly = () => {
  return (
    <section className={styles.pageContainer}>
      <div className={styles.container}>
        <textarea className={styles.grammarlyText} placeholder='내용을 입력해주세요' />
      </div>
      <div className={styles.container}>
        <h2>All Suggestions</h2>
        <ul>
          <li className={styles.suggestionCard}>
            <mark className={styles.wrong}>틀린 내용</mark> -&gt; <mark className={styles.right}>맞는 내용</mark>
            <p>틀린 내용에 대한 설명입니다.</p>
          </li>
          <li className={styles.suggestionCard}>
            <mark className={styles.wrong}>틀린 내용</mark> -&gt; <mark className={styles.right}>맞는 내용</mark>
            <p>틀린 내용에 대한 설명입니다.</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default KGrammarly;
