import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { vs, vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { MdOutlineContentCopy } from "react-icons/md";
import { docco, kimbieDark, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

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
          src={!userImage ? "/user.png" : userImage}
          alt="user"
          width={30}
          height={30}
          className={`flex-none rounded-fu  ${
            sender === "chatbot" ? "dark:invert" : ""
          }`}
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
      <ReactMarkdown
        className="pl-11 text-lg"
        // remarkPlugins={[remarkGfm]}
        // rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            let language = ""; // Variable to store the language

            const match = /language-(\w+)/.exec(className || "");
            if (!inline) {
              if (match) {
                language = match[1]; // Extract and store the language
              }
            }
            // console.log(match);
            return !inline && match ? (
              <div className="mb-8 shadow-lg mt-7">
                <div className="mt-3 px-5 rounded-t-lg text-sm bg-[#2F2F2F] text-gray1 flex justify-between p-3">
                  <div>{language}</div>
                  <div className="flex items-center text-[15px]">
                    <MdOutlineContentCopy /> Copy code
                  </div>
                </div>
                <SyntaxHighlighter
              
                  style={vscDarkPlus}
                  PreTag="div"
                  language={match?.[1]}
                  {...props}
                  customStyle={{
                    fontSize: "1rem",
                    borderRadius: "0px 0px 6px 6px",
                    padding: "20px",
                    marginTop: "0px",
                    marginBottom: "10px",
                    backgroundColor: "black",
      
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                // style={docco}
                // customStyle={{
                //   padding: "0",
                // }}
                // {...props}
                className="font-bold w-0 px-2 py-[2px] text-purple-800  bg-gray-300 rounded"
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default ChatResponse;
