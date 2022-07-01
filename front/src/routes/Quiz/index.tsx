import { useEffect } from 'react';
import { getApi } from 'services/axios';

const Quiz = () => {
  useEffect(() => {
    getApi('quiz').then((res) => console.log(res));
  }, []);

  return <div>Quiz</div>;
};

export default Quiz;
