import { Routes, Route } from 'react-router-dom';

import styles from './routes.module.scss';
import Home from './Home';
import GNB from './_shared/GNB';
import GEC from './GEC';
import Quiz from './Quiz';
import Board from './Board';
import Post from './Board/Post';

const App = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='gec' element={<GEC />} />
          <Route path='quiz' element={<Quiz />} />
          <Route path='board' element={<Board />} />
          <Route path='board/:postId' element={<Post />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
