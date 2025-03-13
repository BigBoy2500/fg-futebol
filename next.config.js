/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CHROME_PATH: process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'puppeteer-core'];
    }
    return config;
  },
  // Configuração para o Puppeteer
  output: 'standalone'
}

module.exports = nextConfig 