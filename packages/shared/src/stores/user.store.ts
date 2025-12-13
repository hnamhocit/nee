import { create } from 'zustand'
import { IJwtPayload } from '../interfaces'

interface UserStore {
	user: IJwtPayload | null
	accessToken: string | null
	isLoading: boolean
	setIsLoading: (loading: boolean) => void
	logout: () => void
	setAuth: (user: IJwtPayload, token: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	accessToken: null,
	isLoading: true,
	setIsLoading: (loading) => set({ isLoading: loading }),
	logout: () => set({ user: null, accessToken: null, isLoading: false }),
	setAuth: (user, token) =>
		set({ user, accessToken: token, isLoading: false }),
}))
