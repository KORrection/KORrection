import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AxiosError } from 'axios';

import { currentUserState } from 'states/user';
import { getApi } from 'services/axios';

import SideMenu from './SideMenu';
import ProfileEditForm from './ProfileEditForm';
import styles from './profile.module.scss';

const Profile = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useRecoilState(currentUserState);

  useEffect(() => {
    getApi('userInfo')
      .then((res) => {
        const { user } = res.data;

        setUserInfo(user);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate, setUserInfo]);

  return (
    <div className={styles.pageContainer}>
      <SideMenu />
      <section>{userInfo && <ProfileEditForm />}</section>
    </div>
  );
};

export default Profile;
