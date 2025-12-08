import {
    BoxesIcon,
    LayoutDashboardIcon,
    SendToBackIcon,
    SettingsIcon,
    TagsIcon,
    UsersIcon
} from 'lucide-react'
import ActiveLink from "@/layouts/components/Sidebar/ActiveLink";

const topPages = [
    {title: 'Home', path: '/', icon: <LayoutDashboardIcon/>},
    {title: 'Users', path: '/users', icon: <UsersIcon/>},
    {title: 'Products', path: '/products', icon: <BoxesIcon/>},
    {title: 'Orders', path: '/orders', icon: <SendToBackIcon/>},
    {title: 'Categories', path: '/categories', icon: <TagsIcon/>},
]

const bottomPages = [
    {title: 'Settings', path: '/settings', icon: <SettingsIcon/>},
]

export default function Sidebar() {
    return <aside
        className='h-screen shrink-0 w-64 border-r-2 border-slate-200 bg-white'>
        <div
            className="h-16 flex items-center justify-center text-2xl text-blue-500 font-semibold">Dashboard
        </div>

        <div className='h-[calc(100vh-64px)] flex flex-col justify-between p-4'>
            <div className="flex flex-col gap-1">
                {topPages.map(page => <ActiveLink key={page.path} {...page} />)}
            </div>

            <div className="flex flex-col gap-4">
                {bottomPages.map(page => <ActiveLink
                    key={page.path} {...page} />)}
            </div>
        </div>
    </aside>
}