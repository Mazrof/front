"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { initializeSocket, disconnectSocket } from "@/lib/socket";
interface SocketProviderProps {
    children: React.ReactNode;
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const pathname = usePathname(); // Track the current URL path
    useEffect(() => {
        // Initialize socket if on a specific path
        if (pathname==="/" || pathname==="/stories") {
            console.log("path",pathname)
            initializeSocket();
        } else {
            disconnectSocket();
        }
    }, [pathname]); // Run this effect when pathname changes

    return <>{children}</>;
};

export default SocketProvider;
