import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { cx } from 'styles';

import { userLoginState } from 'states/user';
import { LogoImage } from 'assets/svgs';
import styles from './gnb.module.scss';

const navData = ['문법 검사기', '퀴즈', '커뮤니티'];
const navURI = ['gec', 'quiz', 'board'];

const GNB = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userLoginState);

  useEffect(() => {
    const cookies = new Cookies();

    setIsLoggedIn(!!cookies.get('token'));
  }, [setIsLoggedIn]);

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
          <li>
            {isLoggedIn ? (
              <a href='http://localhost:5001/logout'>
                <p>로그아웃</p>
              </a>
            ) : (
              <a href='http://localhost:5001/google'>
                <p>로그인</p>
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
