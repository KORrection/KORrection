import { Link } from 'react-router-dom';

import styles from './sideMenu.module.scss';

const SideMenu = () => {
  return (
    <aside className={styles.sideMenu}>
      <ul>
        <li>
          <Link to='/profile'>회원정보 수정</Link>
        </li>
        <li>
          <Link to='/profile/posts'>글 모아보기</Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
