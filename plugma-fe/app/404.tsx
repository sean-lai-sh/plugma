'use client';
import { useEffect } from "react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Button } from '../components/ui/button';

const NotFound = () => {

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <div className="text-7xl font-bold text-luma-600 mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-display font-bold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <Button asChild className="bg-luma-600 hover:bg-luma-700 text-white">
            <a href="/">Return home</a>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
