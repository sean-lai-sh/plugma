'use client';

import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertDialogCancel, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { useForm } from 'react-hook-form';

// Define the form data type
export interface NameFormData {
  firstName: string;
  lastName: string;
}

interface NameFormProps {
  onNext: (data: NameFormData) => void;
  onCancel: () => void;
}

const NameForm: React.FC<NameFormProps> = ({ onNext, onCancel }) => {
  const form = useForm<NameFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: NameFormData) => {
    // Simple manual validation
    let isValid = true;
    
    if (data.firstName.length < 2) {
      form.setError("firstName", { 
        type: "manual", 
        message: "First name must be at least 2 characters." 
      });
      isValid = false;
    }
    
    if (data.lastName.length < 2) {
      form.setError("lastName", { 
        type: "manual", 
        message: "Last name must be at least 2 characters." 
      });
      isValid = false;
    }
    
    if (isValid) {
      onNext(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
      </form>
    </Form>
  );
};

export default NameForm;