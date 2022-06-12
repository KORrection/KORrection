import { Routes, Route } from 'react-router-dom';

import styles from './routes.module.scss';
import IndexPage from './IndexPage';
import GNB from './_shared/GNB';
import KGrammarlyPage from './KGrammarlyPage';
import QuizPage from './QuizPage';
import BoardPage from './BoardPage';

const App = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='grammarly' element={<KGrammarlyPage />} />
          <Route path='quiz' element={<QuizPage />} />
          <Route path='board' element={<BoardPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
