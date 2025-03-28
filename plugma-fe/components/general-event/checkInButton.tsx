'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Check } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import NameForm, { NameFormData } from './NameForm';
import EmailForm, { EmailFormData } from './EmailForm';
import OtpForm, { OtpFormData } from './OTPForm';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/lib/providers/AuthProvider';
import { set } from 'date-fns';

interface CheckInButtonProps {
  eventId: string;
  eventName: string;
}

type Step = 'name' | 'email' | 'verification' | 'success' | 'rsvp' | 'registered' | 'cancel';

const CheckInButton: React.FC<CheckInButtonProps> = ({ eventId }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { user, loading } = useAuth();

  const [checkIn, setCheckIn] = useState('');

  useEffect(() => {
    const checkRegister = async () => {
      // console.log('user', user);
      // console.log('loading', loading);
      if (!user || loading) return;
      // console.log('Checking registration status...');
      const param = new URLSearchParams({
        event_id: eventId,
        user_id: user.id,
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/checkattendee/?${param.toString()}`);
      console.log('Response status:', response);
      const data = await response.json();
      
      if (response.ok && (data != "not registered" && data != 'no')) {
        setIsRegistered(true);
        // now we prepare the check-in
        setCheckIn('/event/checkin/?user_id=' + user.id + '&event_id=' + eventId);



      } else {
        setIsRegistered(false);
      }
    };

    checkRegister();
  }, [eventId, user?.id, loading]);

  // ✅ Render Registered State
  if (user && isRegistered) {
    return (
      <Button className='w-full py-6 mt-3 text-lg flex items-center justify-center' onClick={() => window.location.href = checkIn}>
        Check In
      </Button>
    );
  }

  return (
    <></>
  );
};

export default CheckInButton;
