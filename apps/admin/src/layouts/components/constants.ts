import {
	LayoutDashboard,
	LineChart,
	Package,
	Settings,
	ShoppingBag,
	Tags,
	Users,
} from 'lucide-react'

export const NAV_ITEMS = [
	{
		title: 'Dashboard',
		href: '/',
		icon: LayoutDashboard,
	},
	{
		title: 'Orders',
		href: '/orders',
		icon: ShoppingBag,
	},
	{
		title: 'Products',
		href: '/products',
		icon: Package,
	},
	{
		title: 'Categories',
		href: '/categories',
		icon: Tags,
	},
	{
		title: 'Customers',
		href: '/customers',
		icon: Users,
	},
	{
		title: 'Analytics',
		href: '/analytics',
		icon: LineChart,
	},
	{
		title: 'Settings',
		href: '/settings',
		icon: Settings,
	},
]
