/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['i.pinimg.com', 'lh3.googleusercontent.com', 'cdn.sanity.io'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}
