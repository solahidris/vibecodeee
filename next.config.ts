import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize for Edge runtime (Cloudflare Pages)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Ensure environment variables are available
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Allow images from Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/basicprompt',
        destination: '/resources/prompt/basic',
        permanent: true,
      },
      {
        source: '/resources/basicprompt',
        destination: '/resources/prompt/basic',
        permanent: true,
      },
      {
        source: '/crashcourse',
        destination: '/resources/prompt/python',
        permanent: true,
      },
      {
        source: '/resources/crashcourse',
        destination: '/resources/prompt/python',
        permanent: true,
      },
      {
        source: '/courses/:path*',
        destination: '/resources/courses/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
