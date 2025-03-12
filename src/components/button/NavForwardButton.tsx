'use client';

import AppButton from "@/components/button/AppButton";

export const NavForwardButton = () => {
    const onNextButton = () => {
        window.history.forward();
    };

    return (
        <AppButton classNames={`-with-icon`} onClick={onNextButton} muiIcon="ArrowForward" />
    )
}