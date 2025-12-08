import { User } from '@repo/db'
import { http } from '../lib'

export const userService = {
	getProfile: async () => {
		return http.get<User>('/users/me/profile')
	},
}
