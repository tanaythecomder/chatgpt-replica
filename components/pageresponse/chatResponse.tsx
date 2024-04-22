import Image from "next/image";
import React from "react";

interface ChatResponseProps {
  text: string;
  sender: string;
  timestamp?: string;
  userImage?:string
}

const ChatResponse: React.FC<ChatResponseProps> = ({
  text,
  sender,
  timestamp,
  userImage=null
}) => {
  return (
    <div className="px-5 pt-6 dark:text-gray1 w-full">
      <div className="flex gap-3 items-center ">
        <Image
          src={!userImage? "/logo.svg":userImage}
          alt="user"
          width={30}
          height={30}
          className={`flex-none  ${sender==="chatbot"?"dark:invert":""}`}
        />
        <div className="grow font-bold">{sender}</div>
      </div>
      <div className=" pl-11 text-[15px] font-[500] text-wrap w-full">{text}</div>
    </div>
  );
};

export default ChatResponse;
