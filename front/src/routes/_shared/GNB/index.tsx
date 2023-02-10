import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cx } from 'styles';

import { useOnClickOutside } from 'hooks';
import { userLoginState } from 'states/user';
import { SERVER_URL } from 'constants/index';
import { navData, navURI } from 'constants/gnb';

import MobileGNB from './MobileGNB';
import { LogoImage, User } from 'assets/svgs';
import styles from './gnb.module.scss';

const GNB = () => {
  const [isLoggedIn] = useRecoilState(userLoginState);

  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleMenuClick = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  const handleListClick = () => {
    setIsDropdownOpened(false);
  };

  const handleOnClose = () => {
    setIsDropdownOpened(false);
  };

  const profileRef = useOnClickOutside(handleOnClose);

  return (
    <header className={styles.container}>
      <div>
        <NavLink to='/'>
          <LogoImage className={styles.logoImage} />
        </NavLink>
      </div>
      <MobileGNB isMobileOpened={isMobileOpened} setIsMobileOpened={setIsMobileOpened} />
      <nav className={styles.desktopGNB}>
        <ul className={styles.navItemContainer}>
          {navURI.map((item, i) => (
            <li key={item} className={styles.navItem}>
              <NavLink to={item} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>{navData[i]}</p>
              </NavLink>
            </li>
          ))}
          <li className={styles.navItem}>
            {isLoggedIn ? (
              <div className={cx(styles.select, { [styles.isOpened]: isDropdownOpened })} ref={profileRef}>
                <button type='button' className={cx(styles.profileButton, styles.selected)} onClick={handleMenuClick}>
                  <User />
                </button>
                {isDropdownOpened && (
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
