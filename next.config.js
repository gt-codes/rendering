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
		];
	},
};

module.exports = nextConfig;
