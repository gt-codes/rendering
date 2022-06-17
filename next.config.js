/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
	},
	async rewrites() {
		return [
			{
				source: '/script.js',
				destination: 'https://umami-production-2a81.up.railway.app/umami.js',
			},
			{
				source: '/api/collect',
				destination: 'https://umami-production-2a81.up.railway.app/api/collect',
			},
		];
	},
};

module.exports = nextConfig;
