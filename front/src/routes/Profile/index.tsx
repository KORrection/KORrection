import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { currentUserState, userLoginState } from 'states/user';
import { SERVER_URL } from 'constants/index';
import { getApi } from 'services/axios';

import LoginRequired from 'routes/_shared/LoginRequired';
import SideMenu from './SideMenu';
import ProfileEditForm from './ProfileEditForm';
import styles from './profile.module.scss';

const Profile = () => {
  const isLoggedIn = useRecoilValue(userLoginState);
  const [userInfo, setUserInfo] = useRecoilState(currentUserState);

  useEffect(() => {
    if (isLoggedIn && userInfo.userEmail === '') {
      getApi('userInfo').then((res) => {
        const { user } = res.data;

        setUserInfo(user);
      });
    }
  }, [isLoggedIn, setUserInfo, userInfo.userEmail]);

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <LoginRequired />;
  }

  return (
    <div className={styles.pageContainer}>
      <SideMenu />
      <section>{userInfo && <ProfileEditForm />}</section>
    </div>
  );
};

export default Profile;
