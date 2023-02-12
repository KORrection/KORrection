import { Routes, Route } from 'react-router-dom';

import GNB from './_shared/GNB';
import Home from './Home';
import GEC from './GEC';
import Board from './Board';
import Post from './Post';
import Write from './Write';
import Profile from './Profile';
import PostsCollection from './Profile/PostsCollection';
import Quiz from './Quiz';
import NotFound from './NotFound';
import Footer from './_shared/Footer';
import styles from './routes.module.scss';

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
          <Route path='profile/posts' element={<PostsCollection />} />
          <Route path='quiz' element={<Quiz />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
