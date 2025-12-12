import axios from 'axios'
import { useUserStore } from '../stores'

const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
	withCredentials: true,
})

http.interceptors.request.use((config) => {
	const token = useUserStore.getState().accessToken

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

export { http }
