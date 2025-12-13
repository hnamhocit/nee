const CLOUDFRONT_URL = 'd2ov2dm057jynj.cloudfront.net'

export function getDownloadURL(key: string): string {
	return `https://${CLOUDFRONT_URL}/${key}`
}
