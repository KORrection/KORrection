import { NavLink } from 'react-router-dom';

import { cx } from 'styles';
import styles from './gnb.module.scss';

const GNB = () => {
  return (
    <ul className={styles.container}>
      <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
        홈
      </NavLink>
    </ul>
  );
};

export default GNB;
