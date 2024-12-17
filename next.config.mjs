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
  fontFiles: [
    {
      family: "Roboto",
      src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
    },
  ],
};

export default nextConfig;
