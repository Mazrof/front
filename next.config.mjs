/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
config();

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', 
                port: '', 
                pathname: '/**', 
            },
            {
                protocol: 'http',
                hostname: '**', 
                port: '', 
                pathname: '/**', 
            },
        ],
    },
    env: {
        NEXT_SERVER_IP: isDevelopment 
            ? process.env.SERVER_IP 
            : process.env.NEXT_SERVER_IP, 
    },
};

export default nextConfig;
