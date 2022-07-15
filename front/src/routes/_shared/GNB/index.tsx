import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useOnClickOutside } from 'hooks';
import { cx } from 'styles';

import { userLoginState } from 'states/user';
import { SERVER_URL } from 'constants/index';

import { LogoImage, User } from 'assets/svgs';
import styles from './gnb.module.scss';

const navData = ['문법 검사기', '퀴즈', '커뮤니티'];
const navURI = ['gec', 'quiz', 'board'];

const GNB = () => {
  const [isLoggedIn] = useRecoilState(userLoginState);

  const [isOpened, setIsOpened] = useState(false);

  const handleVisibleOptions = () => {
    setIsOpened((prev) => !prev);
  };

  const handleListClick = () => {
    setIsOpened(false);
  };

  const handleOnClose = () => {
    setIsOpened(false);
  };

  const profileRef = useOnClickOutside(handleOnClose);

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
            <li key={item} className={styles.navItem}>
              <NavLink to={item} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>{navData[i]}</p>
              </NavLink>
            </li>
          ))}
          <li className={styles.navItem}>
            {isLoggedIn ? (
              <div className={cx(styles.select, { [styles.isOpened]: isOpened })} ref={profileRef}>
                <button
                  type='button'
                  className={cx(styles.profileButton, styles.selected)}
                  onClick={handleVisibleOptions}
                >
                  <User />
                </button>
                {isOpened && (
                  <ul className={styles.dropDownMenu}>
                    <li>
                      <Link to='/profile' onClick={handleListClick}>
                        <p>마이 페이지</p>
                      </Link>
                    </li>
                    <li>
                      <a href={`${SERVER_URL}/logout`} onClick={handleListClick}>
                        <p>로그아웃</p>
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <a href={`${SERVER_URL}/google`}>
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
