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

interface RsvpButtonProps {
  eventId: string;
  eventName: string;
}

type Step = 'name' | 'email' | 'verification' | 'success' | 'rsvp' | 'registered' | 'cancel';

const RsvpButton: React.FC<RsvpButtonProps> = ({ eventId, eventName }) => {
  const [step, setStep] = useState<Step>('name');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const resetForm = () => setStep('name');

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetForm();
  };

  const sendVerificationCode = (email: string) => {
    toast({
      title: 'Verification code sent to your email!',
      description: 'One more step to join the fun!',
    });
    setStep('verification');
    setEmail(email);
  };

  const handleNameSubmit = (data: NameFormData) => {
    setName(`${data.firstName} ${data.lastName}`);
    setStep('email');
  };

  const handleEmailSubmit = (data: EmailFormData) => {
    setEmail(data.email);
    sendVerificationCode(data.email);
  };

  const handleOtpSubmit = async (datap: OtpFormData) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: datap.otp,
      type: 'email',
    });

    if (error) {
      toast({
        title: 'Verification Failed!',
        description: 'Please check your email and try again.',
        variant: 'destructive',
      });
      return;
    }

    // fetch the new session user
    const { data: { user: verifiedUser } } = await supabase.auth.getUser();

    if (!verifiedUser) return;

    const params = new URLSearchParams({
      event_id: eventId,
      user_id: verifiedUser.id,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/add_attendee/?${params.toString()}`);

    if (response.ok) {
      toast({
        title: 'RSVP Successful!',
        description: `You're confirmed for ${eventName}`,
        variant: 'default',
      });
      setOpen(false);
    } else {
      toast({
        title: 'RSVP Failed!',
        description: 'There was an error processing your RSVP.',
        variant: 'destructive',
      });
    }

    resetForm();
  };

  const processRSVPSigned = async () => {
    if (!user) return;

    const params = new URLSearchParams({
      event_id: eventId,
      user_id: user.id,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/add_attendee_signed/?${params.toString()}`);

    if (response.ok) {
      toast({
        title: 'RSVP Successful!',
        description: `You're confirmed for ${eventName}`,
        variant: 'default',
      });
      setOpen(false);
      setIsRegistered(true);
    } else {
      toast({
        title: 'RSVP Failed!',
        description: 'There was an error processing your RSVP.',
        variant: 'destructive',
      });
    }

    resetForm();
  };

  const update_attendee = async () => {
    if (!user) return;

    const params = new URLSearchParams({
      event_id: eventId,
      user_id: user.id,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/update_attendee/?${params.toString()}`);

    if (response.ok) {
      toast({
        title: 'RSVP Successful!',
        description: `You're confirmed for ${eventName}`,
        variant: 'default',
      });
      setOpen(false);
      setIsRegistered(true);
    } else {
      toast({
        title: 'RSVP Failed!',
        description: 'There was an error processing your RSVP.',
        variant: 'destructive',
      });
    }

    resetForm();
  };

  const cancelRSVPSigned = async () => {
    if (!user) return;

    const params = new URLSearchParams({
      event_id: eventId,
      user_id: user.id,
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/cancel_attendee/?${params.toString()}`);

    if (response.ok) {
      setIsRegistered(false);
      setStep('cancel');
      toast({
        title: 'Removed you from the event',
        description: `Hope to see you next time!`,
        variant: 'default',
      });
      setOpen(false);
    } else {
      toast({
        title: 'Cancelling Failed!',
        description: 'The gremlins are at it again. Please try again later.',
        variant: 'destructive',
      });
    }

    resetForm();
  };

  useEffect(() => {
    const checkRegister = async () => {
      console.log('user', user);
      console.log('loading', loading);
      if (!user || loading) return;
      console.log('Checking registration status...');
      const param = new URLSearchParams({
        event_id: eventId,
        user_id: user.id,
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/events/checkattendee/?${param.toString()}`);
      console.log('Response status:', response);
      const data = await response.json();
      console.log('Data:', data);
      if (response.ok && (data != "not registered" && data != 'no')) {
        setIsRegistered(true);
        setStep('registered');
        console.log('User is already registered for the event');
      }else if(data =='no'){
        setIsRegistered(false);
        setStep('cancel');
      } else {
        setIsRegistered(false);
        setStep('rsvp');
      }
    };

    checkRegister();
  }, [eventId, user, loading, step]);

  // ✅ Render Registered State
  if (user && isRegistered) {
    return (
      <AlertDialog open={open} onOpenChange={handleDialogChange}>
        <AlertDialogTrigger asChild>
          <Button className="w-full py-6 text-lg flex items-center justify-center bg-gray-600 hover:bg-black transtion-all duraiton-300 ease-in-out">
            <Check className="mr-2 h-5 w-5" />
            You're registered
          </Button>
        </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Change your RSVP?
          </AlertDialogTitle>
          <AlertDialogDescription>
             Life happens, and plans change. If you need to update your RSVP, just let us know!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Back
          </Button>
          <Button onClick={cancelRSVPSigned} variant={'destructive'}>Cancel </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={handleDialogChange}>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-6 text-lg flex items-center justify-center">
          <Calendar className="mr-2 h-5 w-5" />
          RSVP to this event
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {step === 'name' && `Register for ${eventName}`}
            {step === 'email' && 'Enter your email'}
            {step === 'verification' && 'Verify your email'}
            {step === 'rsvp' && 'Register for the event'}
            {step === 'cancel' && 'Change your RSVP?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {step === 'name' && 'Please provide your name to register for this event.'}
            {step === 'email' && 'Please provide your email address to continue.'}
            {step === 'verification' && `We've sent a verification code to ${email}. Please enter the 6-digit code below.`}
            {step === 'rsvp' && 'Do you want to join the fun?'}
            {step === 'cancel' && 'Get back in on the action?'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {step === 'name' && <NameForm onNext={handleNameSubmit} onCancel={() => setOpen(false)} />}
        {step === 'email' && <EmailForm onNext={handleEmailSubmit} onBack={() => setStep('name')} />}
        {step === 'verification' && <OtpForm onNext={handleOtpSubmit} onBack={() => setStep('email')} email={email} />}
        {(step === 'rsvp') && (
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Back
            </Button>
            <Button onClick={processRSVPSigned}>Confirm RSVP</Button>
          </div>
        )}
        {
          step === 'cancel' && (
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Back
              </Button>
              <Button onClick={update_attendee}>Join back</Button>
            </div>
          )  
        }
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RsvpButton;
