'use client'

import { HeroUIProvider } from '@heroui/react'
import { ReactNode } from 'react'

import Auth from './Auth'

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<HeroUIProvider>
			<Auth>{children}</Auth>
		</HeroUIProvider>
	)
}

export default Providers
