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
  webpack: (config, { isServer }) => {
    // Add canvas to externals for server-side builds
    config.externals = [...(config.externals || []), { canvas: "canvas" }];

    if (!isServer) {
      // Use null-loader for canvas in client-side builds to completely ignore it
      config.module.rules.push({
        test: /canvas/,
        use: "null-loader",
      });

      // Set fallback for canvas to false
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }

    return config;
  },
  /*   experimental: {
    esmExternals: "loose", // Required for canvas to work
  }, */
};

export default nextConfig;
