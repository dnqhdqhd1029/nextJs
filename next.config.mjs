/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    MY_ENV_VAR: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  },
  compiler: {
    // console log 없애기
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: false,
  // swcMinify: true,
  poweredByHeader: false,
  generateEtags: false, // ETag 생성하지 않음(https://en.wikipedia.org/wiki/HTTP_ETag)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
  images: {
    domains: ['img.youtube.com'],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/user',
        permanent: true,
      },
      {
        source: '/activity',
        destination: '/activity/activity',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          // TODO: 운영 배포 시에 설정
          // {
          //   key: 'Permissions-Policy',
          //   value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          // },
          // {
          //   key: 'Content-Security-Policy',
          //   value: `default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval'; img-src 'self'; connect-src 'self' '${API_BASE_URL}';`,
          // },
        ],
      },
    ]
  },
}

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

export default nextConfig
