import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EyeIcon, Calendar, ArrowRight } from 'lucide-react';
import { visibilityText } from '@/data/eventData';

const VisibilitySection: React.FC = () => {
  return (
    <Card className="bg-white shadow-sm rounded-xl border animate-zoom-in">
      <CardHeader className="px-4 pt-4">
        <div>
          <CardTitle className="text-xl font-medium">{visibilityText.title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{visibilityText.subtitle}</p>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-6">
        <div className="rounded-lg overflow-hidden border border-border p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-muted-foreground">{visibilityText.managingCalendarLabel}</h4>
                <h3 className="text-lg font-semibold">{visibilityText.calendarTitle}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-700"></div>
                  {visibilityText.publicLabel}
                </span>
                <span className="text-sm text-muted-foreground">{visibilityText.publicDescription}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm flex items-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>Change Visibility</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Transfer Calendar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden border border-border/60 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {visibilityText.discoveryDescription}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisibilitySection;