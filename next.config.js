/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sildukdpipiffzexhjtb.supabase.co",
      },
    ],
  },
};
module.exports = nextConfig;
