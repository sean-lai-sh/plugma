'use client';
import React from 'react'
import { Calendar, Sparkles, Tickets, ChartLine } from "lucide-react";
import { usePathname } from 'next/navigation';
import Profile from './ui/profile';

const DashboardNavbar = () => {
  // Detect Current Page and use that as active tab
    const currentPath = usePathname();
    console.log(currentPath);
    const isActive = (path: string) => currentPath === path ? "text-black font-medium" : "text-slate-500";
    const defaultNavBar = "flex items-center hover:text-black transition-colors duration-300";
    return (
        <header className="border-b border-slate-200 ">
            
            <div className="container mx-auto px-4 md:px-6 py-6 "> 
            

                <div className="flex items-center justify-between">
                    <div className="flex item-center">
                        <a href="/dashboard" className="flex items-center mr-5 ml-[-.25rem]"> 
                            {/*  THE ABOVE IS LITERAL MAGIC (ALIGNS PERFECTLY) */}
                        <span className="text-xl font-semibold tracking-tight text-foreground">plugma</span>
                        <div className="ml-1 w-2 h-2 bg-luma-600 rounded-full"></div>
                        </a>
                        <div className="flex items-center space-x-6">
                            <a href="/dashboard" className={`${defaultNavBar} ${isActive("/dashboard")}`}>
                                <Tickets className="mr-2 h-5 w-5" />
                                <p className="hidden md:inline">Events</p>
                            </a>
                            <a href="#" className={`${defaultNavBar} hidden md:flex ${isActive("/calendar")}`}>
                                <Calendar className="mr-2 h-5 w-5" />
                                <p className="hidden md:inline">Calendar</p>
                            </a>
                            <a href="#" className={`${defaultNavBar} ${isActive("/discover")}`}>
                                <Sparkles className="mr-2 h-5 w-5" />
                                <p className="hidden md:inline">Discover</p>
                            </a>
                            <a href="/dashboard/analytics" className={`${defaultNavBar} ${isActive("/dashboard/analytics")}`}>
                                <ChartLine className="mr-2 h-5 w-5" />
                                <p className="hidden md:inline">Analyze</p>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Profile />
                    </div>
                </div>
            </div>
        </header>
  )
}

export default DashboardNavbar