/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
      formats: ["image/avif", "image/webp"],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*',
            port: ''
          },
        ],
      },
};

export default nextConfig;
