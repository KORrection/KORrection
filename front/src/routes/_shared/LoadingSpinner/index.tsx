import styles from './loadingSpinner.module.scss';

interface IProps {
  width: string;
  height: string;
}

const LoadingSpinner = ({ width, height }: IProps) => {
  return <div className={styles.loading} style={{ width, height }} />;
};

export default LoadingSpinner;
