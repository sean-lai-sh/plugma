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
import { storePrevPath } from '../signup';
import { useAuth } from '@/lib/providers/AuthProvider';

const Profile = ({ hide }: { hide?: boolean }) => {
  const { user, loading } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const router = useRouter();

  const userMetadata = user?.user_metadata || {};
  const profilePic = userMetadata.avatar_url || process.env.NEXT_PUBLIC_DEFAULT_PFP || "";
  const fullName = userMetadata.full_name || "Guest";
  const email = userMetadata.email || "No email";

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error.message);
    else {
      if (window.location.pathname.includes("dashboard") || window.location.pathname.includes("manage")) {
        router.push("/");
      } else if (window.location.pathname.includes("profile")) {
        router.push("/sign-in");
      }
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={profilePic} alt="profile" />
              <AvatarFallback className="bg-yellow-300 text-yellow-700">
                <span className="text-lg">😊</span>
              </AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-56 p-0" align="end">
          {user ? (
            <>
              <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profilePic} alt="avatar" />
                  <AvatarFallback className="bg-yellow-300 text-yellow-700">
                    <span className="text-lg">😊</span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{fullName}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </div>

              <nav className="flex flex-col py-2">
                <a
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  View Dashboard
                </a>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  onClick={() => setAlertOpen(true)}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profilePic} alt="avatar" />
                  <AvatarFallback className="bg-yellow-300 text-yellow-700">
                    <span className="text-lg">😊</span>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Sign back in?</span>
                </div>
              </div>
              <nav className="flex flex-col py-2">
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  onClick={() => {
                    storePrevPath();
                    router.push("/sign-in");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign In
                </button>
              </nav>
            </>
          )}
        </PopoverContent>
      </Popover>

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
