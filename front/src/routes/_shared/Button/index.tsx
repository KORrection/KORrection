import { FormEvent, ReactNode } from 'react';
import cx from 'classnames';

import styles from './button.module.scss';

interface IButtonProps {
  children: ReactNode;
  type: string;
  size: 'small' | 'large';
  primary?: boolean;
  onClick?: () => void;
  onSubmit?: (e: FormEvent) => void;
}

const Button = ({ children, type, size, primary, onClick, onSubmit }: IButtonProps) => {
  return type === 'button' ? (
    <button type='button' className={cx(styles.button, styles[size], { [styles.primary]: primary })} onClick={onClick}>
      {children}
    </button>
  ) : (
    <button
      type='submit'
      className={cx(styles.button, styles[size], { [styles.primary]: primary })}
      onSubmit={onSubmit}
    >
      {children}
    </button>
  );
};

export default Button;
