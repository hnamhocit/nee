import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const getFingerprint = async (): Promise<string> => {
	if (localStorage.getItem('deviceId')) {
		return localStorage.getItem('deviceId') as string
	}

	const fp = await FingerprintJS.load()
	const { visitorId } = await fp.get()

	localStorage.setItem('deviceId', visitorId)

	return visitorId
}
