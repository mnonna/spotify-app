'use client';

import React, { FC, ReactNode, useMemo } from "react";
import dynamic from "next/dynamic";
import '../../scss/button/appButton.scss';

interface AppButtonProps {
  label?: string;
  children?: ReactNode;
  classNames?: string;
  muiIcon?: string;
  onClick?: () => void;
}

const AppButton: FC<AppButtonProps> = ({
  label,
  children,
  classNames,
  muiIcon,
  onClick,
}) => {
  const classNamesConcat = `appButton ${classNames}`;

  // Memoize icon import based on the muiIcon prop
  const IconComponent = useMemo(() => {
    const iconMap = {
      ArrowBack: dynamic(() => import('@mui/icons-material/ArrowBack'), { ssr: false }),
      ArrowForward: dynamic(() => import('@mui/icons-material/ArrowForward'), { ssr: false }),
      PlayArrow: dynamic(() => import('@mui/icons-material/PlayArrow'), { ssr: false }),
      SkipPreviousIcon: dynamic(() => import('@mui/icons-material/SkipPrevious'), { ssr: false }),
      SkipNextIcon: dynamic(() => import('@mui/icons-material/SkipNext'), { ssr: false }),
      PauseIcon: dynamic(() => import('@mui/icons-material/Pause'), { ssr: false }),
      PlayArrowIcon: dynamic(() => import('@mui/icons-material/PlayArrow'), { ssr: false }),
    };

    return muiIcon && iconMap[muiIcon] ? iconMap[muiIcon] : null;
  }, [muiIcon]); // Only recompute the icon when muiIcon changes

  return (
    <button type="button" className={classNamesConcat} onClick={onClick}>
      <span className="appButton__text">{label || ''}</span>
      {IconComponent ? <IconComponent /> : null}
      {children}
    </button>
  );
};

// Wrap in React.memo to prevent unnecessary re-renders
export default React.memo(AppButton);
