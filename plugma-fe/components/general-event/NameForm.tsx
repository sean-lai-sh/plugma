'use client';
import React, {useState, useEffect} from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export type NameFormData = {
    firstName: string;
    lastName: string;
};

interface NameFormProps {
  onNext: (data: NameFormData) => void;
  onCancel: () => void;
}
interface NameFormProps {
  onNext: (data: NameFormData) => void;
  onCancel: () => void;
}

const NameForm: React.FC<NameFormProps> = ({ onNext, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const onSubmit = (data: NameFormData) => {
    onNext(data);
  }; 
  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();
        () => onSubmit({
          firstName: firstName,
          lastName: lastName,
        });

      }} className="space-y-4 py-4">
        {/* <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 w-full">
          <LabelInputContainer className='w-full'>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="John" type="text" value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
          </LabelInputContainer>
          <LabelInputContainer className='w-full'>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Smith" type="text" value={lastName}
        onChange={(e) => setLastName(e.target.value)}/>
          </LabelInputContainer>
        </div>
        </div> */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AlertDialogFooter className="mt-6 gap-2">
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <Button type="submit">Continue</Button>
        </AlertDialogFooter>
      </form></Form>
  );
};

export default NameForm;
