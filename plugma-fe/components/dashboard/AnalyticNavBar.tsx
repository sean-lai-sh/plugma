import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticNavBar = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between">
            <a href="/dashboard" className="flex items-center mr-5 ml-[-.25rem]"> 
                {/*  THE ABOVE IS LITERAL MAGIC (ALIGNS PERFECTLY) */}
                <span className="text-xl font-semibold tracking-tight text-foreground">plugma</span>
                <div className="ml-1 w-2 h-2 bg-luma-600 rounded-full"></div>
            </a>
            <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="flex items-center font-medium text-black">
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Events
            </Link>
            </div>
            <Link href="/create">
            <Button size="sm">Create New Event</Button>
            </Link>
        </div>
        </div>
    </header>
  )
}

export default AnalyticNavBar