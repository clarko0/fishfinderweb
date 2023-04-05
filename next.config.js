/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

module.exports = {
  reactStrictMode: false,
  images: {
    domains: [
      "ik.imagekit.io",
      "worldofdefish-api-test.fra1.digitaloceanspaces.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/iz0kxobkj/item-collections",
      },
      {
        protocol: "https",
        hostname: "worldofdefish-api-test.fra1.digitaloceanspaces.com",
        port: "",
        pathname: "/item-collections",
      },
    ],
  },
};
