import { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { getApi, postApi, putApi } from 'services/axios';
import { SERVER_URL, IMAGE_ON_ERROR_URL } from 'constants/index';

import styles from './profile.module.scss';
import { userLoginState } from 'states/user';
import { useRecoilValue } from 'recoil';

interface IResData {
  description: string;
  nickname: string;
  profilePicture: string;
  userEmail: string;
  [key: string]: string;
}

const Profile = () => {
  const isLoggedIn = useRecoilValue(userLoginState);

  const [userInfo, setUserInfo] = useState<IResData>({
    description: '',
    nickname: '',
    profilePicture: '',
    userEmail: '',
  });
  const [image, setImage] = useState<FileList>();

  useEffect(() => {
    getApi('userInfo').then((res) => {
      const { user } = res.data;

      setUserInfo(user);
    });
  }, []);

  const handleInfoSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) Array.from(image).forEach((i) => formData.append('profilePicture', i));

    putApi(`users`, {
      nickname: userInfo.nickname,
      description: userInfo.description,
    })
      .then(() => {
        postApi(`profile`, formData, {}, 'formData');
      })
      .then((res) => console.log(res));
  };

  const handleValueChange = (name: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setImage(e.currentTarget.files);
  };

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <div>로그인이 필요한 서비스입니다..</div>;
  }

  return (
    <>
      {userInfo && (
        <form className={styles.pageContainer} onSubmit={handleInfoSubmit} encType='multipart/form-data'>
          <img
            src={userInfo.profilePicture}
            alt='userInfo'
            className={styles.userPicture}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = IMAGE_ON_ERROR_URL;
            }}
          />
          <input type='file' accept='image/*' className={styles.imgSelectInput} onChange={handleFileChange} />
          <p>닉네임</p>
          <input
            type='text'
            value={userInfo.nickname}
            onChange={(e) => handleValueChange('nickname', e.currentTarget.value)}
          />
          <p>소개</p>
          <input
            type='text'
            value={userInfo.description}
            onChange={(e) => handleValueChange('description', e.currentTarget.value)}
          />
          <button type='submit'>변경</button>
        </form>
      )}
      <div />
    </>
  );
};

export default Profile;
