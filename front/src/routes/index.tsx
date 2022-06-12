import { Routes, Route } from 'react-router-dom';

import styles from './routes.module.scss';
import Home from './Home';
import GNB from './_shared/GNB';
import KGrammarly from './KGrammarly';
import Quiz from './Quiz';
import Board from './Board';
import SignIn from './SignIn';
import SingUp from './SignUp';

const App = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='grammarly' element={<KGrammarly />} />
          <Route path='quiz' element={<Quiz />} />
          <Route path='board' element={<Board />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SingUp />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
