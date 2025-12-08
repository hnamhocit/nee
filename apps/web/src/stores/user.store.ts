import { User } from '@repo/db'
import {
	LoginInput,
	RegisterInput,
	authService,
	http,
	userService,
} from '@repo/shared'
import { create } from 'zustand'

interface UserStore {
	user: User | null
	accessToken: string | null
	isLoading: boolean

	login: (data: LoginInput) => Promise<void>
	register: (data: RegisterInput) => Promise<void>
	logout: () => Promise<void>
	refresh: () => Promise<void>
	setAccessToken: (token: string | null) => void
	checkAuth: () => Promise<void>
}

export const useUserStore = create<UserStore>((set, get) => ({
	user: null,
	accessToken: null,
	isLoading: true, // Initial loading state

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
		} finally {
			set({ isLoading: false })
		}
	},

	register: async (data) => {
		set({ isLoading: true })
		try {
			await authService.register(data)
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
		} catch (error) {
			// Not authenticated or refresh failed
		} finally {
			set({ isLoading: false })
		}
	},
}))
