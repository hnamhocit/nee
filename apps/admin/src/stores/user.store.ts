import { toast } from 'sonner'
import { create } from 'zustand'

import { User } from '@repo/db'
import { authService, http, LoginInput, userService } from '@repo/shared'

interface UserStore {
	user: User | null
	accessToken: string | null
	isLoading: boolean

	login: (data: LoginInput) => Promise<void>
	logout: () => Promise<void>
	refresh: () => Promise<void>
	setAccessToken: (token: string | null) => void
	checkAuth: () => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
	user: null,
	accessToken: null,
	isLoading: true,

	setAccessToken: (token) => {
		set({ accessToken: token })
		if (token) {
			http.defaults.headers.common['Authorization'] = `Bearer ${token}`
		} else {
			delete http.defaults.headers.common['Authorization']
		}
	},

	login: async (data) => {
		set({ isLoading: true })
		try {
			const res = await authService.login(data)
			get().setAccessToken(res.data.accessToken)
			const profile = await userService.getProfile()
			set({ user: profile.data })
		} catch (e: any) {
			toast.error(`${e.message} (${e.error})`)
		} finally {
			set({ isLoading: false })
		}
	},

	logout: async () => {
		set({ isLoading: true })
		try {
			await authService.logout()
		} catch (error) {
			console.error('Logout failed', error)
		} finally {
			get().setAccessToken(null)
			set({ user: null, isLoading: false })
		}
	},

	refresh: async () => {
		try {
			const res = await authService.refresh()
			get().setAccessToken(res.data.accessToken)
			const profile = await userService.getProfile()
			set({ user: profile.data })
		} catch (error) {
			get().setAccessToken(null)
			set({ user: null })
			throw error
		}
	},

	checkAuth: async () => {
		set({ isLoading: true })
		try {
			await get().refresh()
		} catch (e: any) {
			console.log('Not authenticated or refresh failed')
		} finally {
			set({ isLoading: false })
		}
	},
}))
