"use client"

import {FC, ReactNode} from "react";
import clsx from 'clsx'
import {usePathname} from "next/navigation";
import Link from "next/link";

interface ActiveLinkProps {
    path: string
    icon: ReactNode
    title: string
}

const ActiveLink: FC<ActiveLinkProps> = ({title, path, icon}) => {
    const pathname = usePathname()

    const checkIsActive = () => {
        if (path === "/" && pathname === path) {
            return true
        }

        return path === pathname || pathname.includes(path)
    }

    const isActive = checkIsActive()

    return <Link
        href={path}
        className={clsx("p-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-3", isActive && "bg-blue-500 text-white")}>
        {icon}
        <div
            className={clsx(isActive ? "font-semibold" : "font-medium")}>{title}</div>
    </Link>
}

export default ActiveLink;