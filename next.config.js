/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.graphassets.com',
				port: '',
				pathname: '/EEVCki7TuGyfbK4VlTNQ'
			}
		]
	}
};

module.exports = nextConfig;
module.exports = {
	async redirects() {
		return [
			{
				source: '/api/comment',
				destination: '/api/comment.js',
				permanent: true
			}
		];
	}
};
