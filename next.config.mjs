/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placeholder.pics'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
