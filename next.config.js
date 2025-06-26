// const isExport = process.env.EXPORT

// const config = isExport
// 	? {
// 		images: {
// 			formats: ['image/webp'],
// 			loader: 'imgix',
// 			path: '',
// 		},
// 	}
// 	: {}

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	future: {
		webpack5: true,
	},
	
	// ...config,
}
