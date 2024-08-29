"use client";

import { PropsWithChildren } from "react";
import ReduxProvider from "@/components/redux/reduxProvider";

export default function Providers({ children }: PropsWithChildren<any>) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
}