import { jwtDecode } from 'jwt-decode'

import { http } from '../config'
import { IJwtPayload, IResponse } from '../interfaces'
import { LoginInput, RegisterInput } from '../schemas'
import { useUserStore } from '../stores'

export const authService = {
	login: async (formData: LoginInput & { deviceId: string }) => {
		const { data } = await http.post<IResponse<{ accessToken: string }>>(
			'/auth/login',
			formData,
		)

		const payload = jwtDecode<IJwtPayload>(data.data.accessToken)

		useUserStore.getState().setAuth(payload, data.data.accessToken)
	},

	register: async (formData: RegisterInput) => {
		await http.post('/auth/register', formData)
	},

	checkAuth: async () => {
		const store = useUserStore.getState()

		store.setIsLoading(true)

		try {
			const { data } =
				await http.get<IResponse<{ accessToken: string }>>(
					'/auth/refresh',
				)

			const payload = jwtDecode<IJwtPayload>(data.data.accessToken)
			store.setAuth(payload, data.data.accessToken)
		} catch (error) {
			store.logout()
		} finally {
			store.setIsLoading(false)
		}
	},

	logout: async () => {
		await http.post('/auth/logout')
		useUserStore.getState().logout()
	},
}
