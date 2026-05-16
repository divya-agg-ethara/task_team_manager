/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // Helps on Windows when OneDrive or antivirus locks files during HMR.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**"],
      };
    }
    return config;
  },
};

export default nextConfig;