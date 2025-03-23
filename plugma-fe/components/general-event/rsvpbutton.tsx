'use client';
import React, { useState } from 'react';
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
import { on } from 'events';

interface RsvpButtonProps {
  eventId: string;
  eventName: string;
  isSignedIn?: boolean;
  isRegistered?: boolean;
}

type Step = 'name' | 'email' | 'verification' | 'success';

const RsvpButton: React.FC<RsvpButtonProps> = ({
  eventId,
  eventName,
  isSignedIn = false,
  isRegistered = false,
}) => {
  const [step, setStep] = useState<Step>('name');
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const resetForm = () => {
    setStep('name');
  };

  const onRsvpSuccess = () => {
    console.log("RSVP Successful!");
  }

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetForm();
  };

  const sendVerificationCode = (email: string) => {
    // In a real app, this would send an email with a verification code
    console.log(`Sending verification code to ${email}`);
    toast({
      title: "Verification code sent",
      description: "Please check your email for the verification code",
    });
    setStep('verification');
    setEmail(email);
  };

  const processRSVP = () => {
    // This would be the function that actually registers the user
    console.log(`RSVP processed for event ${eventId}`);
    toast({
      title: "RSVP Successful!",
      description: `You're confirmed for ${eventName}`,
      variant: "default",
    });
    setOpen(false);
    resetForm();
    if (onRsvpSuccess) onRsvpSuccess();
  };

  const handleNameSubmit = (data: NameFormData) => {
    console.log("Name form data:", data);
    setStep('email');
  };

  const handleEmailSubmit = (data: EmailFormData) => {
    console.log("Email form data:", data);
    sendVerificationCode(data.email);
  };

  const handleOtpSubmit = (data: OtpFormData) => {
    console.log(`Verifying OTP: ${data.otp}`);
    // In a real app, this would verify the code
    processRSVP();
  };

  if (isRegistered) {
    return (
      <Button disabled className="w-full py-6 text-lg flex items-center">
        <Check className="mr-2 h-5 w-5" />
        You're registered
      </Button>
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
          </AlertDialogTitle>
          <AlertDialogDescription>
            {step === 'name' && 'Please provide your name to register for this event.'}
            {step === 'email' && 'Please provide your email address to continue.'}
            {step === 'verification' && `We've sent a verification code to ${email}. Please enter the 6-digit code below.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {step === 'name' && (
          <NameForm 
            onNext={handleNameSubmit} 
            onCancel={() => setOpen(false)} 
          />
        )}

        {step === 'email' && (
          <EmailForm 
            onNext={handleEmailSubmit} 
            onBack={() => setStep('name')} 
          />
        )}

        {step === 'verification' && (
          <OtpForm 
            onNext={handleOtpSubmit} 
            onBack={() => setStep('email')} 
            email={email} 
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RsvpButton;
