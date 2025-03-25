import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface EventHeaderProps {
  title: string;
  category: string;
  slug?: string;
}

const EventHeader: React.FC<EventHeaderProps> = ({ title, category, slug }) => {
  return (
    <div className="w-full bg-white border-b py-4 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div>
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <span>{category}</span>
            <ChevronRight className="h-3.5 w-3.5 mx-1" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h1>
            <Link href={`/event/${slug}`} target="_blank" rel="noopener noreferrer">
                <Button 
                variant="outline" 
                size="sm" 
                className="md:self-start flex items-center gap-2"
                onClick={() => redirect(`/event/${slug}`)}
                >
                <span>Event Page</span>
                <ExternalLink className="h-4 w-4" />
                </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EventHeader;