"use client"
import React, { useState } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [courseId, setCourseId] = useState<string | null>(null);
    const { user, isLoaded } = useUser();

    // Handle use Effect isCoursePage 
    if (!isLoaded) return <Loading />
    if (!user) return <div>Please sign in to access this page .</div>


    return (
        <SidebarProvider>
            <div className="dashboard">
                {/* Sidebar is Here  */}
                <AppSidebar />
                <div className="dashboard__content">
                    {/* Chaper sidebar is here */}
                    <div className={cn("dashboard__main")} style={{ height: "100vh" }}>
                        <Navbar />
                        <main className="dashboard__body">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
