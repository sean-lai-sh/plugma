import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
export const AnalyticsWarning = (
    {
        alertTitle,
        alertDescription,
        alertActionText,
        alertOpen, 
        setAlertOpen, 
        alertAction,
    }: {
        alertTitle: string,
        alertDescription: string,
        alertActionText: string,
        alertOpen: boolean, 
        setAlertOpen: (open: boolean) => void,
        alertAction: () => void,
    }
) => {
  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>
            {alertDescription}
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertOpen(false)}>
            Cancel
            </AlertDialogCancel>
            <AlertDialogAction
            onClick={() => {
                alertAction();
            }}
            >
            {alertActionText}
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default AnalyticsWarning