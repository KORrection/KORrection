import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

import { IMAGE_ON_ERROR_URL } from 'constants/imageUrl';
import { formPostApi, putApi } from 'services/axios';
import { currentUserState } from 'states/user';

import styles from './profile.module.scss';

const ProfileEditForm = () => {
  const [userInfo, setUserInfo] = useRecoilState(currentUserState);

  const [image, setImage] = useState<FileList>();

  const handleInfoSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) Array.from(image).forEach((i) => formData.append('profilePicture', i));

    putApi(`users`, {
      nickname: userInfo.nickname,
      description: userInfo.description,
    }).then((res) => {
      const { nickname, description } = res.data;

      setUserInfo((prev) => ({ ...prev, nickname, description }));
    });

    if (image !== undefined) {
      formPostApi(`profile`, formData).then((res) => {
        const { data: profilePicture } = res;

        setUserInfo((prev) => ({ ...prev, profilePicture }));
      });
    }
  };

  const handleValueChange = (name: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) setImage(e.currentTarget.files);
  };

  return (
    <form className={styles.editForm} onSubmit={handleInfoSubmit} encType='multipart/form-data'>
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
  );
};

export default ProfileEditForm;
