'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/80 border-b border-gray-200 blur-backdrop' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold tracking-tight text-foreground">plugma</span>
              <div className="ml-1 w-2 h-2 bg-luma-600 rounded-full"></div>
            </a>
            <nav className="hidden lg:flex ml-10 space-x-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#templates" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </a>
              <a href="#customers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Customers
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/login" className="hidden md:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </a>
            <Button className="bg-black hover:bg-black/90 text-white transition-all" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
