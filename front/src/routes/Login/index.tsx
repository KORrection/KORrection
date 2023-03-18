import { SERVER_URL } from 'constants/index';
import { GoogleLoginButton } from 'assets/images';
import styles from './login.module.scss';

const Login = () => {
  return (
    <div className={styles.pageContainer}>
      <form className={styles.loginForm}>
        <input type='email' placeholder='이메일을 입력해주세요.' />
        <input type='password' placeholder='비밀번호를 입력해주세요.' />
        <button type='submit'>LOGIN</button>
      </form>
      <a href={`${SERVER_URL}/google`} className={styles.googleIconWrapper}>
        <img src={GoogleLoginButton} alt='googleLoginIcon' />
      </a>
    </div>
  );
};

export default Login;
