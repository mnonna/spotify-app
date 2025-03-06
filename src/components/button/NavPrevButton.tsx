'use client';

import AppButton from "@/components/button/AppButton";
import { ArrowBack } from "@mui/icons-material";

export const NavPrevButton = () => {
    const onBackButton = () => {
        window.history.back();
    };

    return (
        <AppButton classNames={`-with-icon`} onClick={onBackButton}>
            <ArrowBack />
        </AppButton>
    )
}