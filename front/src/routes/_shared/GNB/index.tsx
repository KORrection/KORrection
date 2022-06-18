import { NavLink } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import { cx } from 'styles';
import { LogoImage } from 'assets/svgs';
import styles from './gnb.module.scss';
import axios from 'axios';

const navData = ['문법 검사기', '퀴즈', '커뮤니티'];
const navURI = ['grammarly', 'quiz', 'board'];

const backendPortNumber = '5001';
const serverUrl = `http://${window.location.hostname}:${backendPortNumber}/`;

const GNB = () => {
  const cookies = new Cookies();
  let loginStatus = false;
  const loginToken = cookies.get('token');
  loginStatus = !!cookies.get('token');

  const handleLogoutClick = () => {
    // axios.get(`${serverUrl}google`).then((res) => {
    //   console.log(res);
    // });
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
    //   },
    // }

    const bodyData = JSON.stringify(loginToken);
    console.log(loginToken);
    axios
      .post(`${serverUrl}logout`, bodyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => console.log(res));
  };

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
            {loginStatus ? (
              <button type='button' onClick={handleLogoutClick}>
                logout
              </button>
            ) : (
              <NavLink to='signin' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>sign in</p>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GNB;
