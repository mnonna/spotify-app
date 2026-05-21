'use client';

import { useRouter } from "next/navigation";
import AppButton from "@/components/button/AppButton";

export const NavHomeButton = () => {
    const router = useRouter();

    const onHomeButton = () => {
        router.push('/dashboard');
    };

    return (
        <AppButton classNames={`-with-icon`} onClick={onHomeButton} muiIcon="Home" />
    )
}
