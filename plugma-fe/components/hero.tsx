import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-fade-in-fast">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-luma-100 text-luma-700 mb-6">
              The new way to host events
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Your all-in-one platform for unforgettable events
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Practical, simple, and built for event organizers and hosts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href='/create' passHref>
              <Button size="lg" className="bg-luma-600 hover:bg-luma-700 text-white w-full sm:w-auto">
                Create your delightful event
              </Button>
            </Link>
            {/* <Button variant="outline" size="lg" className="group w-full sm:w-auto">
              See examples
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button> */}
          </div>
        </div>
      </div>
      
      <div className="mt-16 mx-auto max-w-5xl px-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 aspect-[16/9]">
          <div className="absolute inset-0 bg-gradient-to-b from-luma-50/80 to-white/5 z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center animate-scale-in"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
