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

const EventFormTypeSelector = () => {
  const [currentCommunity, setCurrentCommunity] = useState<string>("Personal");
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="flex items-end text-sm bg-white px-4 py-2 rounded-full border">{currentCommunity} ▼</DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col relative justify-between items-start mb-8">
        <DropdownMenuCheckboxItem className="flex items-center w-full" 
        checked={currentCommunity === "Personal"}
        onClickCapture={() => setCurrentCommunity("Personal")}>
          <span className="flex items-center text-sm ">
            😊 Personal Calendar
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="flex items-center w-full" 
        checked={currentCommunity === "Public"}
        onClick={() => setCurrentCommunity("Public")}>
          <span className="flex items-center text-sm ">
            🌐 Public
          </span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventFormTypeSelector;