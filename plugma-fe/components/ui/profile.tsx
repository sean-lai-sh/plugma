'use client';
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { supabase } from "../../lib/supabaseClient";
import { Settings, User, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';

const Profile = ({hide}:{hide?: boolean}) => {
    const [userData, setUserData] = useState<any>(null);
    const [profilePic, setProfilePic] = useState<string>(process.env.NEXT_PUBLIC_DEFAULT_PFP || "");
    const [alertOpen, setAlertOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            console.log(user?.user_metadata);
            console.log(process.env.DEFAULT_PFP);
            setUserData(user);
            if(user?.user_metadata) {
                setProfilePic(user.user_metadata.avatar_url || process.env.NEXT_PUBLIC_DEFAULT_PFP || "");
            }
            console.log(user?.user_metadata.avatar_url);
        };
        fetchUser();
        console.log(profilePic);
    }, [profilePic]);

    const SignOut = async () => {
        console.log("Signing out...");
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
        else{
            // if in dashboard directory redirect to home page
            if (window.location.pathname.includes("dashboard")) {
                router.push("/");
            }else if(window.location.pathname.includes("profile")) {
                router.push("/sign-in");
            }else if (window.location.pathname.includes("manage")) {
                router.push("/sign-in");
            }
        }
        return null;
        }   
    /// if not logged in,  and hide is true, return null
    if (!userData && hide) return null;
    if (!userData) return null;

    return (
        <>
        <Popover>
            <PopoverTrigger asChild>
            <button className="rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={profilePic || ""} alt={profilePic} />
                <AvatarFallback className="bg-yellow-300 text-yellow-700">
                    <span className="text-lg">😊</span>
                </AvatarFallback>
                </Avatar>
            </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
            <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <Avatar className="h-10 w-10">
                <AvatarImage src={profilePic || ""} alt={profilePic} />
                <AvatarFallback className="bg-yellow-300 text-yellow-700">
                    <span className="text-lg">😊</span>
                </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                {userData ? (
                    <>
                    <span className="text-xs text-muted-foreground">{userData.user_metadata.full_name}</span>
                    <span className="text-xs text-muted-foreground">{userData.user_metadata.email}</span>
                    </>
                ) : "Error"}
                </div>
            </div>
            <nav className="flex flex-col py-2">
                <a 
                href="/profile" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                <User className="h-4 w-4" />
                View Profile
                </a>
                <a 
                href="/settings" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                <Settings className="h-4 w-4" />
                Settings
                </a>
                <button 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                onClick={() => setAlertOpen(true)}
                >
                <LogOut className="h-4 w-4" />
                Sign Out
                </button>
            </nav>
            </PopoverContent>
        </Popover>

        {/* Alert dialog triggered when "Sign Out" is clicked */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                Clicking "Continue" will sign you out.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                onClick={() => {
                    setAlertOpen(false);
                    SignOut();
                }}
                >
                Continue
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
};

export default Profile;
