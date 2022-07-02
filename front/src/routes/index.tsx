import { Routes, Route } from 'react-router-dom';

import styles from './routes.module.scss';
import GNB from './_shared/GNB';
import Home from './Home';
import GEC from './GEC';
import Board from './Board';
import Post from './Post';
import Write from './Write';
import Profile from './Profile';
import NotFound from './NotFound';
import Footer from './_shared/Footer';

const App = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='gec' element={<GEC />} />
          <Route path='board' element={<Board />} />
          <Route path='board/:postId' element={<Post />} />
          <Route path='board/write' element={<Write />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
