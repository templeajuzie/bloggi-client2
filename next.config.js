/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    // images: {
    //     protocol: 'https',
    //     domains: ["blog.hubspot.com", "source.unsplash.com", "cloudinary.com"],
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
