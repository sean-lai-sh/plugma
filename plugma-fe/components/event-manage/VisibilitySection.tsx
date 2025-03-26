'use client';
import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EyeIcon, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/providers/AuthProvider';
import { manageEventType } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { commInfo } from '@/lib/types';
import EventFormTypeSelector from '../event-form/EventFormTypeSelector';
import AnalyticsWarning from '../general/AnalyticsWarning';
import { Toast } from '../ui/toast';
import { toast } from '@/hooks/use-toast';
import { set } from 'date-fns';

const VisibilitySection = ({eventData, slug}: {eventData:manageEventType ,  slug:string}) => {
    const [communityName, setCommunityName] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [communityList, setCommunityList] = useState<commInfo[]>([{
          community_id: "1",
          creator_id: "1",
          name: "Personal",
          description: "Personal Community",
        }]);
    const { user } = useAuth();
    const [currComm, setCurrComm] = useState<string>('');

    useEffect(() => {
        const fetchCommunity = async () => {
          
            if(user){
              const id = user.id;
              const params = new URLSearchParams({ user_id: id });
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_ROUTE}/ds/getallcomms/?${params.toString()}`,
              );
              if(res){
                  const data = await res.json();
                  setCommunityList(data);
                  console.log(data);
                  if(eventData){
                    for (let i = 0; i < data.length; i++) {
                      if(data[i].community_id == eventData.community_id){
                        setCommunityName(data[i].name);
                        setCurrComm(data[i].name);
                        break;
                      }
                    }
                  }
              }
              // Now find the community associated with the event
              
            }
            
        }
        fetchCommunity();
    }, []);

    const setCommName = (communityName: string) => {
      // if community name is not in valid communities, add it to valid communities
      if(!communityList.map(community => community.name).includes(communityName)){
        setCommunityList([...communityList, {
          community_id: communityName,
          creator_id: "1",
          name: communityName,
          description: "New Community",
      }]);
      }
      setCommunityName(communityName);
    }
  const ConfirmChange = () => {
    console.log("Confirming Change");
    setOpen(true);
  }

  const update_community = async () => {
    if (!user) return;
      const params = new URLSearchParams({
        event_id: slug,
        user_id: user.id,
        comm_name: communityName,
      });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/update_event_comm/?${params.toString()}`);
      if (response.ok) {
        console.log("Community Updated");
        setOpen(false);
        toast({
          title: 'Community Transfer Successful!',
          description: `Event is now part of ${communityName}`,
          variant: 'default',
        })
        setCurrComm(communityName);
      } else {
        console.log("Community Update Failed");
      }
    }
  return (
    <>
    <Card className="bg-white shadow-sm rounded-xl border animate-zoom-in">
      <CardHeader className="px-4 pt-4">
        <div>
          <CardTitle className="text-xl font-medium">Change Communtiy Affiliation</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Each event is only part of 1 community</p>
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
                <h4 className="text-sm text-muted-foreground">Current Community</h4>
                <h3 className="text-lg font-semibold">{currComm}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-700"></div>
                  Active
                </span>
                <span className="text-sm text-muted-foreground"></span>
              </div>
              
               <div className="flex flex-wrap gap-2 mt-4 items-center">
                {/* <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm flex items-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>Change Visibility</span>
                </Button> */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-sm flex items-center gap-2"
                  onClick={ConfirmChange}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Transfer Community</span>
                </Button>
                <EventFormTypeSelector
                  validCommunities={
                    communityList.map((comm) => comm.name)
                  }
                  onCommunityChange={setCommName}


                />
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="rounded-lg overflow-hidden border border-border/60 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 flex items-center justify-center bg-secondary rounded-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                asdasdasdasda
              </p>
            </div>
          </div>
        </div> */}
      </CardContent>
    </Card>
    <AnalyticsWarning alertTitle={'Confirm Community Change'} alertDescription={''} alertActionText={'Confirm'} alertOpen={open} setAlertOpen={setOpen} alertAction={update_community}      
    />
    </>
  );
};

export default VisibilitySection;