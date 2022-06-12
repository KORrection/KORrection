import { NavLink } from 'react-router-dom';

import { cx } from 'styles';
import styles from './gnb.module.scss';

const navData = ['grammarly', 'quiz', 'board', 'login'];

const GNB = () => {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <p>HOME</p>
          </NavLink>
        </li>
        {navData.map((item) => {
          return (
            <li key={`gnb-item-${item}`}>
              <NavLink to={item} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>{item.toUpperCase()}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default GNB;
