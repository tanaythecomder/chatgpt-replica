import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";

import {
  docco,
  dracula,
  solarizedLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  language: string;
  value: string;
}

interface ChatResponseProps {
  text: string;
  sender: string;
  timestamp?: string;
  userImage?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus}>
      {value}
    </SyntaxHighlighter>
  );
};

const ChatResponse: React.FC<ChatResponseProps> = ({
  text,
  sender,
  timestamp,
  userImage = null,
}) => {
  return (
    <div className="px-5 pt-6 dark:text-gray1 w-full">
      <div className="flex gap-3 items-center ">
        <Image
          src={!userImage ? "/logo.svg" : userImage}
          alt="user"
          width={30}
          height={30}
          className={`flex-none  ${sender === "chatbot" ? "dark:invert" : ""}`}
        />
        <div className="grow font-bold">{sender}</div>
      </div>
      {/* <div className=" pl-11 text-[15px] font-[500] text-wrap w-full">{text}</div> */}
      {/* <ReactMarkdown
        // components={components as any}
        className=" pl-11 text-[15px] font-[500] text-wrap w-full"
        components={{code:CodeBlock as any}}
      >
        {text}
      </ReactMarkdown> */}
      <Markdown
        className="pl-11 text-[16px] font-[500] text-wrap w-full"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            let language = ""; // Variable to store the language

            const match = /language-(\w+)/.exec(className || "");
            if (!inline) {
              if (match) {
                language = match[1]; // Extract and store the language
              }
            }

            return !inline && match ? (
              <div className="mb-8 shadow-lg mt-7">
                <div className="mt-3 px-5 rounded-t-lg text-sm bg-[#2F2F2F] text-gray1 flex justify-between p-3">
                  <div>{language}</div>
                  <div className="flex items-center text-[15px]"><MdOutlineContentCopy/> Copy code</div>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  PreTag="div"
                  language={match[1]}
                  {...props}
                  customStyle={{
                    fontSize: "1.2rem",
                    borderRadius: "0px 0px 6px 6px",
                    padding: "20px",
                    marginTop: "0px",
                    marginBottom:"10px",
                    backgroundColor: "black",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className + ""} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </Markdown>
    </div>
  );
};

export default ChatResponse;
