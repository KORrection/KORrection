import { Dispatch, SetStateAction } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cx } from 'styles';

import { useOnClickOutside } from 'hooks';
import { userLoginState } from 'states/user';
import { SERVER_URL } from 'constants/index';
import { navData, navURI } from 'constants/gnb';

import { Close, Hamburger } from 'assets/svgs';
import styles from './gnb.module.scss';

interface IProps {
  isMobileOpened: boolean;
  setIsMobileOpened: Dispatch<SetStateAction<boolean>>;
}

const MobileGNB = ({ isMobileOpened, setIsMobileOpened }: IProps) => {
  const [isLoggedIn] = useRecoilState(userLoginState);

  const handleMenuClick = () => {
    setIsMobileOpened((prev) => !prev);
  };

  const handleListClick = () => {
    setIsMobileOpened(false);
  };

  const handleOnClose = () => {
    setIsMobileOpened(false);
  };

  const mobileRef = useOnClickOutside(handleOnClose);

  return (
    <>
      <div className={styles.mobileMenu}>
        {isMobileOpened ? (
          <button type='button' onClick={handleOnClose}>
            <Close />
          </button>
        ) : (
          <button type='button' onClick={handleMenuClick}>
            <Hamburger />
          </button>
        )}
      </div>
      {isMobileOpened && (
        <nav className={styles.mobileGNB} ref={mobileRef}>
          <ul>
            {navURI.map((item, i) => (
              <li key={`mobile-${item}`} className={styles.mobileNavItem}>
                <NavLink
                  to={item}
                  className={({ isActive }) =>
                    cx({ [styles.isActive]: isActive }, { [styles.isOpened]: isMobileOpened })
                  }
                  onClick={handleListClick}
                >
                  <p>{navData[i]}</p>
                </NavLink>
              </li>
            ))}
            {isLoggedIn ? (
              <>
                <li className={styles.mobileNavItem}>
                  <Link to='/profile' onClick={handleListClick}>
                    <p>마이 페이지</p>
                  </Link>
                </li>
                <li className={styles.mobileNavItem}>
                  <a href={`${SERVER_URL}/logout`} onClick={handleListClick}>
                    <p>로그아웃</p>
                  </a>
                </li>
              </>
            ) : (
              <li className={styles.mobileNavItem}>
                <Link to='/login' onClick={handleListClick}>
                  <p>로그인</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default MobileGNB;
