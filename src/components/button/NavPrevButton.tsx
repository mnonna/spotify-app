'use client';

import AppButton from "@/components/button/AppButton";

export const NavPrevButton = () => {
    const onBackButton = () => {
        window.history.back();
    };

    return (
        <AppButton classNames={`-with-icon`} onClick={onBackButton} muiIcon="ArrowBack" />
    )
}