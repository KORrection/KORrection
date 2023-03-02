import { NavLink } from 'react-router-dom';
import { cx } from 'styles';

import styles from './sideMenu.module.scss';

const SideMenu = () => {
  return (
    <aside className={styles.sideMenu}>
      <ul>
        <li>
          <NavLink end to='/profile' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            회원정보 수정
          </NavLink>
        </li>
        <li>
          <NavLink to='/profile/posts' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            글 모아보기
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
