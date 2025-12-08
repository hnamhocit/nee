import { http } from '../lib'
import { LoginInput, RegisterInput } from '../schemas'

export const authService = {
	register: async (data: RegisterInput) => {
		return http.post('/auth/register', data)
	},

	login: async (data: LoginInput) => {
		return http.post<{ accessToken: string }>('/auth/login', data)
	},

	logout: async () => {
		return http.post('/auth/logout')
	},

	refresh: async () => {
		return http.post<{ accessToken: string }>('/auth/refresh')
	},
}
