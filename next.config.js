/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
	},
	webpack: (config, { webpack, buildId }) => {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.BUILD_ID': JSON.stringify(buildId),
			})
		);
		return config;
	},
	async rewrites() {
		return [
			{
				source: '/script.js',
				destination: 'https://garrett.up.railway.app/umami.js',
			},
			{
				source: '/api/collect',
				destination: 'https://garrett.up.railway.app/api/collect',
			},
		];
	},
};

module.exports = nextConfig;
