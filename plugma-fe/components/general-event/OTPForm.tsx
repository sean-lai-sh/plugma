'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { LabelInputContainer } from '../signup';

export type OtpFormData = {
  otp: string;
};

interface OtpFormProps {
  onNext: (data: OtpFormData) => void;
  onBack: () => void;
  email: string;
}

const OtpForm: React.FC<OtpFormProps> = ({ onNext, onBack, email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!otp || otp.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    
    // Clear any existing error
    setError(null);
    
    // Submit the form
    onNext({
      otp: otp,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <LabelInputContainer className="mb-4">
        <Label htmlFor="otp">Enter Verification Code</Label>
        <div className="mx-auto">
          <InputOTP 
            maxLength={6} 
            value={otp} 
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-sm font-medium text-destructive mt-2">
              {error}
            </p>
          )}
        </div>
      </LabelInputContainer>
      
      <AlertDialogFooter className="mt-6 gap-2">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit">Verify</Button>
      </AlertDialogFooter>
    </form>
  );
};

export default OtpForm;