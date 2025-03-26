import React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Plus } from "lucide-react";
import { AlertDialog } from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface Props {
  onCommunityChange: (value: string) => void;
  validCommunities?: string[];
}

const EventFormTypeSelector: React.FC<Props> = ({ onCommunityChange, validCommunities }) => {
  const [currentCommunity, setCurrentCommunity] = useState<string>(validCommunities?.[0] || "Personal");
  const [open, setOpen] = useState(false);
  const [tempCommunity, setTempCommunity] = useState("");

  const handleChange = (value: string) => {
    setCurrentCommunity(value);
    onCommunityChange(value); // Notify parent

  };
  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger className="flex items-end text-sm bg-white px-4 py-2 rounded-full border">{currentCommunity} ▼</DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col relative justify-between items-start mb-8">
          {
            validCommunities?.map((community) => (
              <DropdownMenuItem key={community} onSelect={() => handleChange(community)} className="flex items-center w-full">
                <DropdownMenuCheckboxItem checked={currentCommunity === community}>
                  {community}
                </DropdownMenuCheckboxItem>
              </DropdownMenuItem>
            ))
          }

            <DropdownMenuItem onSelect={() => setOpen(true)}>
              <div className="flex items-center w-full">
                <Plus className="h-4 w-4" />
                <DropdownMenuLabel>Add Community</DropdownMenuLabel>
              </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open = {open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Add Community</AlertDialogTitle>
                <AlertDialogDescription>
                New group of friends?
                </AlertDialogDescription>
            </AlertDialogHeader>
            {/* Text area to edit */}
            <Input placeholder="Community Name"  value={tempCommunity}
            onChange={(e) => setTempCommunity(e.target.value)}
            />
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                onClick={() => {
                    handleChange(tempCommunity);
                }}
                >
                Add
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventFormTypeSelector;