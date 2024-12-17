/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agenda.erpimj.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "indomonangjadi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
