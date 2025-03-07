"use client"

import { useMemo } from "react";
import { usePathname } from "@node_modules/next/navigation";
import { BiSearch } from "@node_modules/react-icons/bi";
import { HiHome } from "@node_modules/react-icons/hi";
import Box from "./Box"
import SidebarItem from "./SidebarItem";

interface SidebarProps {
    children: React.ReactNode;
}
const Sidebar = ({children}: SidebarProps) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        },
    ], [pathname])

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    Song Library
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
        </div>
    )
}

export default Sidebar;