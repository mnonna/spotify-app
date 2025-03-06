'use client';

import { FC, ReactNode } from "react";
import '../../scss/button/appButton.scss';

interface AppButtonProps {
  label?: string;
  children?: ReactNode;
  classNames?: string;
  onClick?: () => void; // Change onClick to onClick
}

const AppButton: FC<AppButtonProps> = ({
  label,
  children,
  classNames,
  onClick, // Use onClick instead of onClick
}) => {
  const classNamesConcat = `appButton ${classNames}`;

  return (
    <button type="button" className={classNamesConcat} onClick={onClick}> {/* Directly use onClick */}
      <span className="appButton__text">{label || ''}</span>
      {children}
    </button>
  );
};

export default AppButton;