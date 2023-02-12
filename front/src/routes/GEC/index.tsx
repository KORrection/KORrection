import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useMount } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';

import { userLoginState } from 'states/user';
import { gecTextState } from 'states/gec';
import { getApi, postApi } from 'services/axios';
import { SERVER_URL } from 'constants/index';
import tempGecApi from 'services/gec';

import { Comment, Document } from 'assets/svgs';
import Button from 'routes/_shared/Button';
import LoadingSpinner from 'routes/_shared/LoadingSpinner';
import LoginRequired from 'routes/_shared/LoginRequired';
import Suggestion from './Suggestion';
import styles from './gec.module.scss';

const GEC = () => {
  const isLoggedIn = useRecoilValue(userLoginState);
  const [textValue, setTextValue] = useRecoilState(gecTextState);

  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[][]>([]);
  const [originSentences, setOriginSentences] = useState<string[]>([]);

  useMount(async () => {
    try {
      const { data } = await tempGecApi.checkIsInProgress();
      const { task, taskId: existTaskId } = data.payload;

      if (task) {
        setIsLoading(true);
        const { data: getData } = await tempGecApi.getCorrectionResult();

        const { status, result, originals } = getData.payload;
        setIsLoading(false);

        if (status === 'Completed') {
          const newResult = result.map((duplicateData) => [...new Set(duplicateData)]);

          setResults(newResult);
          setTaskId('');
          setIsLoading(false);
          setOriginSentences(originals);
        } else if (status === 'InProgress') {
          setIsLoading(true);
        }
      }
      if (!task) {
        setTextValue('');
      }
    } catch (err) {
      setTextValue('');
    }
  });

  // const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
  //   setTextValue(e.currentTarget.value);
  // };

  const handleGecSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);

    // postApi(`gec/corrections`, {
    //   sentences: textValue,
    // })
    //   .then((res) => setTaskId(res.data.payload.taskId))
    //   .catch(() => {
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    if (taskId !== '') {
      const getTaskInterval = setInterval(() => {
        tempGecApi
          .getCorrectionResult()
          .then((res) => {
            const { status, result, originals } = res.data.payload;

            if (status === 'Completed') {
              const newResult = result.map((duplicateData) => [...new Set(duplicateData)]);

              setResults(newResult);
              setTaskId('');
              setIsLoading(false);
              setOriginSentences(originals);

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

    return <LoginRequired />;
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
              // onChange={handleValueChange}
              readOnly
            />
            <div className={styles.textLength}>
              <span>{textValue.length}</span>
              <span> / 500</span>
            </div>
          </div>
          <Button type='submit' size='large'>
            {isLoading ? <LoadingSpinner width='25px' height='25px' /> : 'GO!'}
          </Button>
        </form>
      </section>
      <section className={styles.container}>
        <div className={styles.title}>
          <Document />
          <h2>All Suggestions</h2>
        </div>
        <ul className={styles.suggestions}>
          {isLoading ? (
            <LoadingSpinner width='40px' height='40px' />
          ) : (
            <>
              {results.map((result, i) => {
                const key = `gec-${i}`;
                const originalSentence: string = originSentences[i];

                if (
                  originalSentence === '\n ' ||
                  originalSentence === '\n' ||
                  originalSentence === ' ' ||
                  originalSentence === ''
                ) {
                  return null;
                }

                return <Suggestion key={key} result={result} originalSentence={originalSentence} />;
              })}
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default GEC;
