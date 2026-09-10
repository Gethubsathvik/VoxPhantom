// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  experimental: {
    webVitals: true,
  },
  // Add PWA configuration
  pwa: {
    dest: 'public',
    disable: false,
    register: true,
    skipWaiting: true,
  },
};

module.exports = nextConfig;