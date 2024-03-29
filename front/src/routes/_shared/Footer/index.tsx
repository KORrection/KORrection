import { LogoImage } from 'assets/svgs';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LogoImage height='30px' width='170px' />
      <p>
        © 2022.{' '}
        <a href='https://github.com/KORrection/KORrection' target='_blank' rel='noreferrer'>
          KORrection
        </a>
        . ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default Footer;
