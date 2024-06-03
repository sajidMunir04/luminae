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
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: ''
          },
        ],
      },
};

export default nextConfig;
