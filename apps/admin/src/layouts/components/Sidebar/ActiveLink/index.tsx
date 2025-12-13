import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentType, SVGProps } from 'react'

import { cn } from '@/lib/utils'

type ActiveLinkProps = Readonly<{
	href: string
	title: string
	icon: ComponentType<SVGProps<SVGSVGElement>>
}>

export default function ActiveLink({
	href,
	title,
	icon: Icon,
}: ActiveLinkProps) {
	const pathname = usePathname()

	const isActive = pathname === href
	return (
		<Link
			href={href}
			className={cn(
				'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
				isActive ?
					'bg-muted text-primary font-semibold'
				:	'text-muted-foreground',
			)}>
			<Icon className='h-4 w-4' />
			{title}
		</Link>
	)
}
