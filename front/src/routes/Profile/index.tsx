import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRecoilValue } from 'recoil';

import { getApi, postApi, putApi } from 'services/axios';
import { userLoginState } from 'states/user';
import { SERVER_URL, IMAGE_ON_ERROR_URL } from 'constants/index';

import LoginRequired from 'routes/_shared/LoginRequired';
import styles from './profile.module.scss';

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

  const handleInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) Array.from(image).forEach((i) => formData.append('profilePicture', i));

    const {
      data: { nickname, description },
    } = await putApi(`users`, {
      nickname: userInfo.nickname,
      description: userInfo.description,
    });

    setUserInfo((prev) => ({ ...prev, nickname, description }));

    if (image !== undefined) {
      const { data: profilePicture } = await postApi(`profile`, formData, {}, 'formData');

      setUserInfo((prev) => ({ ...prev, profilePicture }));
    }
  };

  const handleValueChange = (name: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setImage(e.currentTarget.files);
  };

  if (!isLoggedIn) {
    window.location.href = `${SERVER_URL}/google`;

    return <LoginRequired />;
  }

  return (
    <>
      {userInfo && (
        <form className={styles.pageContainer} onSubmit={handleInfoSubmit} encType='multipart/form-data'>
          <div className={styles.imgContainer}>
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
          </div>
          <div className={styles.textInputContainer}>
            <div>
              <p className={styles.inputLabel}>이메일</p>
              <input type='text' value={userInfo.userEmail} disabled className={styles.textInput} />
            </div>
            <div>
              <p className={styles.inputLabel}>닉네임</p>
              <input
                type='text'
                value={userInfo.nickname}
                onChange={(e) => handleValueChange('nickname', e.currentTarget.value)}
                className={styles.textInput}
              />
            </div>
            <div>
              <p className={styles.inputLabel}>소개</p>
              <input
                type='text'
                value={userInfo.description}
                onChange={(e) => handleValueChange('description', e.currentTarget.value)}
                className={styles.textInput}
              />
            </div>
          </div>
          <button type='submit' className={styles.submitButton}>
            회원정보 변경
          </button>
        </form>
      )}
      <div />
    </>
  );
};

export default Profile;
