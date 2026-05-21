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
  const IconComponent = useMemo(() => {
    const iconMap = {
      ArrowBack: dynamic(() => import('@mui/icons-material/ArrowBack'), { ssr: false }),
      ArrowForward: dynamic(() => import('@mui/icons-material/ArrowForward'), { ssr: false }),
      Home: dynamic(() => import('@mui/icons-material/Home'), { ssr: false }),
      PlayArrow: dynamic(() => import('@mui/icons-material/PlayArrow'), { ssr: false }),
      SkipPreviousIcon: dynamic(() => import('@mui/icons-material/SkipPrevious'), { ssr: false }),
      SkipNextIcon: dynamic(() => import('@mui/icons-material/SkipNext'), { ssr: false }),
      PauseIcon: dynamic(() => import('@mui/icons-material/Pause'), { ssr: false }),
      PlayArrowIcon: dynamic(() => import('@mui/icons-material/PlayArrow'), { ssr: false }),
      ViewListIcon: dynamic(() => import('@mui/icons-material/ViewList'), { ssr: false }),
      CloseIcon: dynamic(() => import('@mui/icons-material/Close'), { ssr: false }),
    };

    return muiIcon && iconMap[muiIcon] ? iconMap[muiIcon] : null;
  }, [muiIcon]);

  return (
    <button type="button" className={classNamesConcat} onClick={onClick}>
      <span className="appButton__text">{label || ''}</span>
      {IconComponent ? <IconComponent /> : null}
    </button>
  );
};

export default React.memo(AppButton);