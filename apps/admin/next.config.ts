import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'd2ov2dm057jynj.cloudfront.net',
			},
		],
	},
}

export default nextConfig
