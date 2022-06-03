import { Routes, Route } from 'react-router-dom';

import styles from './routes.module.scss';
import HomePage from './Home';

const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
