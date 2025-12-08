import axios from 'axios'

const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

http.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error)
	},
)

export { http }
