'use client';

import AppButton from "@/components/button/AppButton";
import { ArrowForward } from "@mui/icons-material";

export const NavForwardButton = () => {
    const onNextButton = () => {
        window.history.forward();
    };

    return (
        <AppButton classNames={`-with-icon`} onClick={onNextButton}>
            <ArrowForward />
        </AppButton>
    )
}