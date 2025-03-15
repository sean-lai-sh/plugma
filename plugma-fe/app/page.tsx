'use client';
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  useEffect(() => {
      // Fetch user session
      const fetchUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
  
        if (!user) {
          router.push("/dashboard"); // Redirect if not signed in
        } else {
          setUser(user);
        }
      };
    }
  );
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  );
}
