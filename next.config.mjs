/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
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
