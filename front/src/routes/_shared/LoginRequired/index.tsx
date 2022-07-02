import LoadingSpinner from '../LoadingSpinner';
import styles from './loginRequired.module.scss';

const LoginRequired = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginRequired}>
        <div>
          로그인이 필요한 서비스입니다.
          <br />
          로그인 화면으로 이동합니다.
        </div>
        <LoadingSpinner width='40px' height='40px' />
      </div>
    </div>
  );
};

export default LoginRequired;
