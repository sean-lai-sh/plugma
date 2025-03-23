'use client';
import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { LabelInputContainer } from '../signup';



export type EmailFormData = {
    email: string;
};

interface EmailFormProps {
    onNext: (data: EmailFormData) => void;
    onBack: () => void;
}


const EmailForm: React.FC<EmailFormProps> = ({ onNext, onBack }) => {
    const [email, setEmail] = useState("");
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        // Handle form submission logic here
        onNext({
          email: email,
        });
    }} className="space-y-4 py-4">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="myself@mail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <AlertDialogFooter className="mt-6 gap-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onBack}
          >
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </AlertDialogFooter>
    </form>
  )
}

export default EmailForm