import { Dispatch, MouseEvent, ReactNode, SetStateAction, useState } from 'react';
import { cx } from 'styles';

import { useOnClickOutside } from 'hooks/useOnClickOutside';

import { ArrowDown } from 'assets/svgs';
import styles from './dropDown.module.scss';

interface IDropDownProps {
  children: ReactNode;
  selectList: string[];
  setCurrentSelect: Dispatch<SetStateAction<string>>;
  size: 'large' | 'medium' | 'small';
}

const DropDown = ({ children, selectList, setCurrentSelect, size }: IDropDownProps) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const handleVisibleOptions = () => {
    setIsOpenSelect((prev) => !prev);
  };

  const handleListClick = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value;
    setCurrentSelect(selectedValue ?? selectList[0]);
    setIsOpenSelect(false);
  };

  const handleOnClose = () => {
    setIsOpenSelect(false);
  };

  const dropDownRef = useOnClickOutside(handleOnClose);

  return (
    <div className={cx(styles.select, styles[size], { [styles.isOpenSelect]: isOpenSelect })} ref={dropDownRef}>
      <button type='button' className={cx(styles.selected, styles[size])} onClick={handleVisibleOptions}>
        {children}
        <ArrowDown className={cx(styles.downArrowIcon, { [styles.selectMenuOpen]: isOpenSelect })} />
      </button>
      <ul>
        {isOpenSelect &&
          selectList.map((value) => {
            return (
              <li className={styles.option} key={value}>
                <button type='button' data-value={value} onClick={handleListClick}>
                  {value}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DropDown;
