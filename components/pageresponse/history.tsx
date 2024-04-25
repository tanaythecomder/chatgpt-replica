import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HistoryProps {
  name: string;
  onClick?: () => void;
  className?: string; // Adding className prop to the interface
}

const HistoryCard: React.FC<HistoryProps> = ({ name, onClick, className }) => {
  return (
    <div
      className={`${className} flex items-center px-3 py-3 hover:bg-gray-200 dark:bg-grayside dark:hover:bg-gray-800  rounded-xl`}
    >
      <div className={` grow font-semibold rounded-xl dark:text-gray1 `}>{name.slice(0,30)}</div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <MdOutlineDeleteForever
              className="text-[21px] mr-4 dark:text-gray1 hover:text-gray-600  "
              onClick={onClick}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>delete this chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HistoryCard;
