"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import { FiEdit } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { HiUpload } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ChatResponse from "@/components/pageresponse/chatResponse";
import HistoryCard from "@/components/pageresponse/history";
import { Switch } from "@/components/ui/switch";
import run from "@/utils/gemini/gemini";

interface MessageResponse {
  message_id: any;
  chat_id?: any;
  sender: any;
  content: any;
}
interface HistoryResponse {
  chat_id: any;
  name: any;
}

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<null | {
    id: string;
    username: string;
    avatar_url?: string;
  }>(null);
  const [ongoingPromt, setOngoingPromt] = useState<string>("");
  const [chatId, setChatId] = useState<string | null>();
  const [messages, setMessages] = useState<
    MessageResponse[] | undefined | null
  >(undefined);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const [dark, setDark] = useState<boolean>();

  // useEffect(() => {
  //   try {
  //     // Get the initial dark mode value from localStorage or default to false
  //     const initialDarkMode = localStorage.getItem("darkMode") === "true";
  //     setDark(initialDarkMode);
  //   } catch (error) {
  //     console.error("Error accessing localStorage:", error);
  //   }
  // }, []);

  useEffect(() => {
    try {
      // Get the initial dark mode value from localStorage or default to false
      const initialDarkMode = localStorage.getItem("darkMode") === "true";
      setDark(initialDarkMode);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const [history, setHistory] = useState<
    HistoryResponse[] | undefined | null
  >();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on component update
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleToggle = (index: number) => {
    if (clickedCard === index) {
      // setClickedCard(null);
    } else {
      setClickedCard(index);
    }
  };
  async function signOut() {
    console.log("logged out", user);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setChatId(null);
    setMessages(null);
    setHistory(null);
    sessionStorage.removeItem("chat_id");
    if (error) throw error;
  }
  async function handleChatId(id?: string) {
    console.log("yes ");
    if (id) {
      sessionStorage.setItem("chat_id", id);
      setChatId(id);
    } else {
      setClickedCard(null);
      console.log("removing chatid");
      sessionStorage.removeItem("chat_id");
      setChatId(null);
    }
  }

  // console.log(chatId);
  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("message_id,sender,content")
        .eq("chat_id", chatId)
        .order("timestamp", { ascending: true });

      if (error) throw error;
      // console.log(data);
      setMessages(data);
    } catch (error) {
      console.log("Messages retrieval failed", error);
    }
  }

  // function to handle prompt submit button
  async function handleSubmit() {
    // console.log(chatId);
    if (!chatId && user && ongoingPromt.trim() !== "") {
      try {
        const { data, error } = await supabase
          .from("chats")
          .insert([
            {
              user_id: user.id,
              start_time: new Date(),
              name: ongoingPromt, // Current timestamp
            },
          ])
          .select();

        if (error) {
          throw error;
        }
        // console.log(data);
        const insertedChatId = data[0].chat_id;
        // console.log(insertedChatId);
        setChatId(insertedChatId);
        setClickedCard(0);
        sessionStorage.setItem("chat_id", insertedChatId.toString());
      } catch (error) {
        console.error("Error inserting chat:", error);
      }
    }

    try {
      if (!user) {
        alert("login first");
      } else if (ongoingPromt.trim() !== "") {
        const chat_id = sessionStorage.getItem("chat_id");

        console.log("....I am here");

        // add try and catch to handle error
        const { error: promptError } = await supabase
          .from("messages")
          .insert([
            {
              chat_id: chat_id,
              sender: "user",
              timestamp: new Date(),
              content: ongoingPromt,
            },
          ])
          .select();
        const result = await run(ongoingPromt);
        if (result) {
          console.log(result);

          const { data, error } = await supabase
            .from("messages")
            .insert([
              {
                chat_id: chat_id,
                sender: "chatbot",
                timestamp: new Date(),
                content: result.result,
              },
            ])
            .select();

          if (error) throw error;
        }
        // console.log(data);
      } else return;
      setOngoingPromt("");
    } catch (error) {
      console.log(error);
    }

    if (chatId) fetchMessages();
  }

  useEffect(() => {
    // console.log("........in fetchmessage......");
    if (chatId && user) {
      // console.log("....fetching message......");
      fetchMessages();
    } else {
      // console.log(".....if chatid is null");
      setMessages(null);
    }
  }, [chatId]);
  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select("chat_id, name,start_time")
          .eq("user_id", user?.id)
          .order("start_time", { ascending: false });
        // console.log(data);
        setHistory(data);

        if (error) console.log(error);
      } catch (error) {
        console.log(error);
      }
    }
    if (user) fetchHistory();
  }, [user, chatId]);
  useEffect(() => {
    //  const value: boolean = JSON.parse(storedDarkMode as string);

    async function fetchData() {
      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError || !userData) {
          setUser(null);
          return;
        }

        const userId = userData.user.id;

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username,full_name, avatar_url")
          .eq("id", userId)
          .single();

        if (profileError || !profileData) {
          setUser(null); // Handle error or if profile not found
          return;
        }

        // Set username in state
        setUser({
          id: userId,
          username: profileData.username || profileData.full_name,
          avatar_url: profileData.avatar_url,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      const chat_id = sessionStorage.getItem("chat_id");
      if (chat_id) {
        setChatId(chat_id);
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scroll({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };
    scrollToBottom();
  }, [messages]);

  // async function handleSignInWithGoogle(response: any) {
  //   const { data, error } = await supabase.auth.signInWithIdToken({
  //     provider: "google",
  //     token: response.credential,
  //     nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
  //   });
  //   console.log(data);
  // }

  return (
    <>
      {/* {console.log(process.env.NEXT_PUBLIC_API_GEMINI)} */}
      <main className={`flex h-screen ${dark ? "dark bg-graycenter" : ""} `}>
        <ScrollArea
          className="min-w-[21rem] max-w-[21rem]  rounded-md border p-4 bg-[#F9F9F9] dark:bg-grayside
        "
        >
          {/* sidebar nav bar */}
          <div
            onClick={() => handleChatId()}
            className="hover:bg-gray-200 dark:hover:bg-gray-800 bg-[#F9F9F9] hover:rounded-xl py-2 px-2 flex justify-between items-center sticky top-0 dark:bg-grayside dark:text-white "
          >
            <div className="flex items-center gap-2  ">
              <div className="bg-white p-[5px] border-2 rounded-full dark:bg-graycenter ">
                <Image
                  className="rounded-full border-1 dark:invert"
                  src={"/logo.svg"}
                  alt="Logo"
                  width={23}
                  height={23}
                />
              </div>
              <div className="font-semibold  dark:text-gray2">New Chat</div>
            </div>
            <div className="pr-5">
              <FiEdit className="text-xl " />
            </div>
          </div>

          {/* History */}
          <div className="pt-10 h-screen">
            {history?.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  handleToggle(index);
                  handleChatId(data.chat_id);
                }}
              >
                <HistoryCard
                  name={data.name}
                  className={`cursor-pointer ${
                    clickedCard === index ? "bg-gray-200  dark:bg-gray-700" : ""
                  }`}
                  onClick={async () => {
                    const { error } = await supabase
                      .from("chats")
                      .delete()
                      .eq("chat_id", data.chat_id);
                    if (error) {
                      console.log(error);
                    }
                    if (chatId === data.chat_id) setChatId(null);
                    else setChatId(chatId);
                  }}
                />
              </div>
            ))}
          </div>

          {user ? (
            <>
              <div className="flex sticky bottom-0 bg-[#F9F9F9] px-5 pb-4 pt-6 gap-4 items-center dark:bg-grayside">
                <img
                  src={user?.avatar_url || "/user.png"}
                  alt="user"
                  width={38}
                  height={38}
                  className="flex-none rounded-full"
                />
                <div className="grow text-lg tracking-wide font-[400] dark:text-white">
                  {user.username}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-base space-y-1 sticky bottom-0 bg-[#F9F9F9] pl-3 pr-2 py-4 tracking-wide dark:bg-grayside dark:text-white">
                <div className="font-bold dark:text-gray2 ">
                  Sign up or log in{" "}
                </div>
                <div className="text-gray-400 dark:text-gray1">
                  Save your chat history, share chats, and personalize your
                  experience.
                </div>
                <div className="pt-2">
                  <Link href={"/signup"}>
                    <Button className="w-full bg-[#10a37f] font-semibold hover:bg-[#327262] rounded-xl py-6 dark:text-white ">
                      Signup
                    </Button>
                  </Link>
                </div>
                <div className="pt-2">
                  <Link href={"/login"}>
                    <Button className="w-full border-2 bg-white font-semibold text-black hover:bg-slate-100 rounded-xl py-6  dark:text-gray2 dark:bg-graycenter">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </ScrollArea>
        <main className="w-full h-screen flex flex-col justify-center items-center dark:bg-graycenter">
          <div className="w-full">
            <div className="flex px-5 py-5 items-center">
              <div className="grow ">
                <span className="text-[22px] font-semibold dark:text-white tracking-tight ">
                  ChatGPT{" "}
                </span>
                <span className="text-gray3 text-[21px] dark:text-gray1 font-semibold ">
                  3.5
                </span>
              </div>

              <Switch
                className="mr-3"
                onClick={() => {
                  setDark((v) => !v);
                  localStorage.setItem("darkMode", (!dark).toString());
                }}
                checked={dark}
              />

              {user ? (
                <div className="">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="mr-3">
                        <Button
                          className="bg-white text-black border-2 shadow-none rounded-xl dark:bg-gray5  "
                          onClick={signOut}
                        >
                          <AiOutlineLogout className="text-xl dark-t" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">click to log out</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <>
                  <></>
                </>
              )}
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
            <div
              className="grow h-full w-full pb-10 overflow-y-auto"
              ref={scrollAreaRef}
            >
              {chatId ? (
                <div className="flex justify-center">
                  <div className="w-[60%] space-y-3">
                    {messages?.map((message, key) => (
                      <ChatResponse
                        key={key}
                        sender={message.sender}
                        text={message.content}
                        userImage={
                          message.sender === "chatbot"
                            ? "/logo.svg"
                            : user?.avatar_url
                        }
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className=" flex flex-col items-center  justify-center mt-[15%] gap-5">
                    <div className="bg-white dark:bg-graycenter p-2 border-2 rounded-full">
                      <Image
                        className="rounded-full border-1 dark:invert "
                        src={"/logo.svg"}
                        alt="Logo"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="font-bold text-3xl dark:text-gray1">
                      How can I help you today?
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="w-[60%] flex relative">
              <textarea
                className="resize-none pr-12 w-full border border-gray-100 flex mb-10 pt-6 rounded-2xl text-lg pl-8 outline-none ring-0 shadow-lg dark:bg-graycenter dark:text-white dark:placeholder-gray1"
                placeholder="Message ChatGPT.."
                onChange={(e) => setOngoingPromt(e.target.value)}
                value={ongoingPromt}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit();
                  }
                }}
                style={{
                  minHeight: "48px ", // Set a default minimum height
                  maxHeight: "200px", // Set a maximum height to prevent the input from growing too large
                  overflowY: "auto", // Enable scrolling when the content exceeds the height
                }}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="absolute right-1 bottom-12"
                    onClick={handleSubmit}
                  >
                    <HiUpload
                      aria-disabled={ongoingPromt.trim() === "" ? true : false}
                      className="hover:text-white hover:bg-black text-[40px] m-3 bg-gray-100 dark:bg-gray5 dark:hover:bg-gray-100 dark:hover:text-black rounded-xl p-2"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black font-semibold  text-white text-base mb-3 rounded-2xl">
                    <p className="px-1 py-2">Send Message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </main>
      </main>
    </>
  );
}
