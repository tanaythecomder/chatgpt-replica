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
import ChatResponse from "@/components/pageresponse/chatResponse";
import HistoryCard from "@/components/pageresponse/history";

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
  const [user, setUser] = useState<null | { id: string; username: string }>(
    null
  );
  const [ongoingPromt, setOngoingPromt] = useState<string>("");
  const [chatId, setChatId] = useState<string | null>();
  const [messages, setMessages] = useState<
    MessageResponse[] | undefined | null
  >(undefined);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  const [history, setHistory] = useState<
    HistoryResponse[] | undefined | null
  >();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggle = (index: number) => {
    if (clickedCard === index) {
      setClickedCard(null); // If already clicked, reset the state
    } else {
      setClickedCard(index); // Set the clicked card ID
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
        console.log(data);
        const insertedChatId = data[0].chat_id;
        console.log(insertedChatId);
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
        const { data, error } = await supabase
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
        if (error) throw error;
        console.log(data);
      } else return;
      setOngoingPromt("");
    } catch (error) {
      console.log(error);
    }

    if (chatId) fetchMessages();
  }

  // fetching the messages from the database
  useEffect(() => {
    console.log("........in fetchmessage......");
    if (chatId && user) {
      console.log("....fetching message......");
      fetchMessages();
    } else {
      console.log(".....if chatid is null");
      setMessages(null);
    }
  }, [chatId]);

  // used to fetch side bar history
  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data, error } = await supabase
          .from("chats")
          .select("chat_id, name,start_time")
          .eq("user_id", user?.id)
          .order("start_time", { ascending: false });
        console.log(data);
        setHistory(data);

        if (error) console.log(error);
      } catch (error) {
        console.log(error);
      }
    }
    if (user) fetchHistory();
  }, [user, chatId]);

  // Import your supabase client

  useEffect(() => {
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
          .select("username")
          .eq("id", userId)
          .single();

        if (profileError || !profileData) {
          setUser(null); // Handle error or if profile not found
          return;
        }

        // Set username in state
        setUser({ id: userId, username: profileData.username });
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
      <div className=" flex h-screen">
        <ScrollArea
          className="min-w-[21rem] max-w-[21rem]  rounded-md border p-4 bg-[#F9F9F9] 
        "
        >
          {/* sidebar nav bar */}
          <div
            onClick={() => handleChatId()}
            className="bg-[#F9F9F9] hover:bg-gray-200 hover:rounded-xl py-2 px-2 flex justify-between items-center sticky top-0 "
          >
            <div className="flex items-center gap-2 ">
              <div className="bg-white p-[5px] border-2 rounded-full">
                <Image
                  className="rounded-full border-1 text-black"
                  src={"/logo.svg"}
                  alt="Logo"
                  width={23}
                  height={23}
                />
              </div>
              <div className="text-black font-semibold">New Chat</div>
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
                    clickedCard === index ? "bg-gray-200" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          {user ? (
            <>
              <div className="flex sticky bottom-0 bg-[#F9F9F9] px-5 pb-4 pt-6 gap-4 items-center">
                <Image
                  src={"/user.png"}
                  alt="user"
                  width={38}
                  height={38}
                  className="flex-none"
                />
                <div className="grow text-lg tracking-wide font-[400]">
                  {user.username}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-base space-y-1 sticky bottom-0 bg-[#F9F9F9] pl-3 pr-2 py-4 tracking-wide">
                <div className="font-bold text-black ">Sign up or log in </div>
                <div className="text-gray-400">
                  Save your chat history, share chats, and personalize your
                  experience.
                </div>
                <div className="pt-2">
                  <Link href={"/signup"}>
                    <Button className="w-full bg-[#10a37f] font-semibold hover:bg-[#327262] rounded-xl py-6">
                      Signup
                    </Button>
                  </Link>
                </div>
                <div className="pt-2">
                  <Link href={"/login"}>
                    <Button className="w-full border-2 bg-white font-semibold text-black hover:bg-slate-100 rounded-xl py-6">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </ScrollArea>
        <main className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between px-5 py-5 items-center">
              <div className="text-[22px]">
                <span className="font-semibold dark:text-white">ChatGPT</span>{" "}
                <span className="text-gray-300">3.5</span>
              </div>
              {user ? (
                <>
                  <Button
                    className="bg-white text-black border-2 shadow-none rounded-xl "
                    onClick={signOut}
                  >
                    <AiOutlineLogout className="text-xl" />
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                </>
              )}
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center overflow-y-auto">
            <ScrollArea className="grow h-full w-full pb-4 ">
              {chatId ? (
                <>
                  {" "}
                  <div className="flex justify-center">
                    <div className="min-w-[60%]">
                      {messages?.map((message, key) => (
                        <ChatResponse
                          key={key}
                          sender={message.sender}
                          text={message.content}
                          userImage={"/user.png"}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className=" flex flex-col items-center  justify-center h-full mt-[15%] gap-5">
                    <div className="bg-white p-2 border-2 rounded-full">
                      <Image
                        className="rounded-full border-1 text-black"
                        src={"/logo.svg"}
                        alt="Logo"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="font-bold text-3xl">
                      How can I help you today?
                    </div>
                  </div>
                </>
              )}
            </ScrollArea>
            <div className="w-[60%] flex relative">
              <Input
                className="  flex mb-10 py-8 rounded-2xl text-lg pl-8 outline-none ring-0 shadow-md"
                type="email"
                placeholder="Message ChatGPT.."
                onChange={(e) => setOngoingPromt(e.target.value)}
                value={ongoingPromt}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />

              <HiUpload
                onClick={handleSubmit}
                className=" hover:text-white hover:bg-black text-[40px] m-3 bg-gray-100 rounded-xl p-2 absolute right-1"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
