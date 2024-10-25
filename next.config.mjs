/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows images from any domain
                port: '', // Optional, can specify if needed
                pathname: '/**', // Matches any path
            },{
                protocol: 'http',
                hostname: '**', // Allows images from any domain
                port: '', // Optional, can specify if needed
                pathname: '/**', // Matches any path
            },
        ],
    },
};

export default nextConfig;
