'use client';

import { FC, ReactNode } from "react";
import '../../scss/button/appButton.scss';

interface AppButtonProps {
  label?: string,
  children?: ReactNode,
  classNames?: string,
  onClickEvent?: () => void,
}

const AppButton: FC<AppButtonProps> = ({
  label,
  children,
  classNames,
  onClickEvent,
}) => {
  const classNamesConcat = `appButton ${classNames}`;

  return (
    <button type="button" className={classNamesConcat} onClick={() => onClickEvent()}>
      <span className="appButton__text">{label || ''}</span>
      { children }
    </button>
  )
}

export default AppButton;