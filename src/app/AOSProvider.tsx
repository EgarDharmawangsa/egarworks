"use client";

import { useEffect, ReactNode } from "react";
import AOS from "aos";

type AOSProviderProps = {
    children: ReactNode;
};

const AOSProvider: React.FC<AOSProviderProps> = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return <>{children}</>;
};

export default AOSProvider;