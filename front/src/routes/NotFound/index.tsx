import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFoundcontainer}>
      <img
        src='https://ai-healthcare.co.kr/data/editor/2203/ed2f68568fb38d69a985410b3368bc2d_1648353618_72.png'
        alt='404'
      />
      <Link to='/'>Go to HOME</Link>
    </div>
  );
};

export default NotFound;
