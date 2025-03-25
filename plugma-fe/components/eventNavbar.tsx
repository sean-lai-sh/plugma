
import React, { Suspense } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Profile from '@/components/ui/profile'
import {redirect} from 'next/navigation'
import { useAuth } from '@clerk/nextjs';
import EventNavCTA from './eventNavCTA';

const EventNavbar = ({slug} : {slug?:string}) => {
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
            </div>
            <div className='flex items-center space-x-5'>
              <Suspense fallback={<Link href={`/create`}>
                  <Button
                  size="sm"
                  
                  >
                  Create New Event
                  </Button>
              </Link>}>
                <EventNavCTA slug={slug}/>
              </Suspense>            
              <Profile/>
            </div>
        </div>
        </div>
    </header>
  )
}

export default EventNavbar