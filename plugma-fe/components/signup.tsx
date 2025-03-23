"use client";
import React, {useEffect} from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

export default function SignupComp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showName, setShowName] = useState(false);
  const {toast} = useToast();

  const waitForEmailConfirmation = async (userId: string) => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        const { data } = await supabase.auth.getUser();
        if (data?.user?.id === userId && data.user.confirmed_at) {
          clearInterval(interval);
          resolve();
        }
      }, 5000); // Poll every 5 seconds
    });
  };
  

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    console.log("fetching user");
    // Try signing in the user first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(signInData, signInError);
    if (signInData.user) {
      // User exists & logged in successfully
      router.push("/dashboard");
      setLoading(false);
      return;
    }
  
    if (signInError && signInError.message === "Invalid login credentials") {
      // User doesn't exist → Attempt sign-up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
          }
        }
      });
      console.log("signUpData", signUpData);
      console.log("signUpError", signUpError);
      if (signUpData.user) {
        // New user created → Ask them to check their email
        toast({title:"Check your email to confirm your account.",description:"Please check your inbox and click on the confirmation link to activate your account.",duration:5000});
        await waitForEmailConfirmation(signUpData.user.id);
        router.push("/dashboard");
      } else {
        // Sign-up failed → Show error
        setError(signUpError?.message || "An error occurred.");
      }
    } else {
      // Another error occurred
      setError(signInError?.message || "An error occurred.");
    }
  
    setLoading(false);
  };
    // // Handle OAuth Sign-in (GitHub, Google, OnlyFans)
    // const handleOAuthSignIn = async (provider: "github" | "google") => {
    //   setLoading(true);
    //   const { error } = await supabase.auth.signInWithOAuth({ provider });
    //   if (error) setError(error.message);
    //   setLoading(false);
    //   // redirect to events page or dashboard
    //   if(!error) router.push("/dashboard");
    // };
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    // Fetch user session
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        router.push("/dashboard"); // Redirect if signed in
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-40 mb-10">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to plugma
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {showName ? "Come join the fun!" : "Ready to host an event?"}
      </p>

      <form className="my-8" onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
          
        }}>
        {showName && <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="John" type="text" value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Smith" type="text" value={lastName}
        onChange={(e) => setLastName(e.target.value)}/>
          </LabelInputContainer>
        </div>}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="myself@mail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {showName ? (loading ? "Signing up..." : "Sign up →")
                : (loading ? "Signing In..." : "Sign In →")}
          <BottomGradient />
        </button>
        <a className="text-xs text-neutral-700 hover:text-neutral-800 dark:text-neutral-300 mt-4 block text-left cursor-pointer" onClick={e => setShowName(!showName)} >
          {showName ? "Already have an account?" : "Sign up?" }
        </a>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* <div className="flex flex-col space-y-4">
        {/* <button
            className="flex items-center justify-center w-full bg-gray-50 dark:bg-zinc-900 rounded-md h-10 font-medium shadow-input"
            type="button"
            onClick={() => handleOAuthSignIn("google")}
          >
            <IconBrandGoogle className="h-4 w-4 mr-2" /> Sign up with Google
          </button> 
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
