import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userLoginState } from 'states/user';
import { gecTextState } from 'states/gec';
import { getApi, postApi } from 'services/axios';
import { SERVER_URL } from 'constants/index';

import { Comment, Document } from 'assets/svgs';
import Button from 'routes/_shared/Button';
import LoadingSpinner from 'routes/_shared/LoadingSpinner';
import Suggestion from './Suggestion';
import styles from './gec.module.scss';

const GEC = () => {
  const isLoggedIn = useRecoilValue(userLoginState);

  const [textValue, setTextValue] = useRecoilState(gecTextState);
  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [originSentences, setOriginSentences] = useState([]);

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTextValue(e.currentTarget.value);
  };

  const handleGecSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    postApi(`gec/corrections`, {
      sentences: textValue,
    })
      .then((res) => setTaskId(res.data.payload.taskId))
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (taskId !== '') {
      const getTaskInterval = setInterval(() => {
        getApi(`gec/corrections/${taskId}`)
          .then((res) => {
            const { asd: originalSentences } = res.data;
            const { status, result } = res.data.payload;

            if (status === 'Completed') {
              const newResult = result.map((duplicateData: string) => [...new Set(duplicateData)]);
              setResults(newResult);
              setTaskId('');
              setIsLoading(false);
              setOriginSentences(originalSentences);

              clearInterval(getTaskInterval);
            } else if (status === 'InProgress') {
              setIsLoading(true);
            }
          })
          .catch(() => {
            setIsLoading(false);
          });
      }, 2000);
    }
  }, [taskId]);

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <div>로그인이 필요한 서비스입니다..</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.container}>
        <div className={styles.title}>
          <Comment />
          <h2>Document</h2>
        </div>
        <form className={styles.gecForm} onSubmit={handleGecSubmit}>
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
          <Button type='submit' size='large'>
            {isLoading ? <LoadingSpinner width='25px' height='25px' /> : 'save'}
          </Button>
        </form>
      </section>
      <section className={styles.container}>
        <div className={styles.title}>
          <Document />
          <h2>All Suggestions</h2>
        </div>
        <ul>
          {results.map((result, i) => {
            const key = `gec-${i}`;
            const originalSentence = originSentences[i];

            if (originalSentence !== '') {
              return <Suggestion key={key} result={result} originalSentence={originalSentence} />;
            }

            return null;
          })}
        </ul>
      </section>
    </div>
  );
};

export default GEC;
