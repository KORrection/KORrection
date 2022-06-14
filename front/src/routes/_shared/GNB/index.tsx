import { NavLink } from 'react-router-dom';

import { cx } from 'styles';
import { LogoImage } from 'assets/svgs';
import styles from './gnb.module.scss';

const navData = ['문법 검사기', '퀴즈', '커뮤니티', 'sign in'];
const navURI = ['grammarly', 'quiz', 'board', 'signin'];

const GNB = () => {
  return (
    <header className={styles.container}>
      <div>
        <NavLink to='/'>
          <LogoImage className={styles.logoImage} />
        </NavLink>
      </div>
      <nav>
        <ul>
          {navURI.map((item, i) => (
            <li key={item}>
              <NavLink to={item} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>{navData[i]}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
