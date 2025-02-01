import { useClerk, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import React from 'react'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { BookOpen, Briefcase, DollarSign, PanelLeft, Settings, User } from 'lucide-react';
import Loading from './Loading';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

const AppSidebar = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const pathname = usePathname();
    const { toggleSidebar } = useSidebar();
    const navLinks = {
        student: [
            { icon: BookOpen, label: "Courses", href: "/user/courses" },
            { icon: Briefcase, label: "Billing", href: "/user/billing" },
            { icon: User, label: "Profile", href: "/user/profile" },
            { icon: Settings, label: "Settings", href: "/user/settings" },
        ],
        teacher: [
            { icon: BookOpen, label: "Courses", href: "/teacher/courses" },
            { icon: DollarSign, label: "Billing", href: "/teacher/billing" },
            { icon: User, label: "Profile", href: "/teacher/profile" },
            { icon: Settings, label: "Settings", href: "/teacher/settings" },
        ]
    }
    if (!isLoaded) return <Loading />;
    if (!user) return <div>User Not Found</div>
    const userType = (user.publicMetadata.userType as "student" | "teacher") || "student";
    const currentNavLinks = navLinks[userType]
    return (
        <Sidebar
            collapsible='icon'
            style={{ height: '100vh' }}
            className='bg-customgreys-primarybg border-none shadow-lg' >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            onClick={() => toggleSidebar()}
                            className='group hover:bg-customgreys-secondarybg'
                        >
                            <div className="app-sidebar__logo-container group ">
                                <div className="app-sidebar__logo-wrapper">
                                    <Image
                                        alt='logo'
                                        src="/logo.svg"
                                        width={25}
                                        height={20}
                                        className='app-sidebar__logo'
                                    />
                                    <p className='app-sidebar__title'>OMAR</p>
                                </div>
                                <PanelLeft className='app-sidebar__collapse-icon' />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {currentNavLinks.map((link, index) => {
                        const isActive = pathname.includes(link.href)
                        return (<SidebarMenuItem key={index} className={cn("app-sidebar__nav-item", isActive && "bg-gray-800")
                        } >
                            <a href={link.href} className={`group hover:bg-customgreys-secondarybg ${pathname === link.href ? 'active' : ''}`}>
                                <div className="app-sidebar__menu-item-wrapper">
                                    <span className="app-sidebar__menu-icon">
                                        {link.icon}
                                    </span>
                                    <span className="app-sidebar__menu-label">{link.label}</span>
                                </div>
                            </a>
                        </SidebarMenuItem>)
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    )
}

export default AppSidebar
