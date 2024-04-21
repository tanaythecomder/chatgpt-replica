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
import { error } from "console";
import { on } from "stream";
import ChatResponse from "@/components/pageresponse/chatResponse";

interface MessageResponse {
  message_id: any;
  chat_id?: any;
  sender: any;
  content: any;
}

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<null | string>(null);
  const [ongoingPromt, setOngoingPromt] = useState<string>("");
  const [chatId, setChatId] = useState<string | null>();
  const [messages, setMessages] = useState<
    MessageResponse[] | undefined | null
  >(undefined);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  async function signOut() {
    console.log("logged out", user);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setChatId(null);
    setMessages(null);
    sessionStorage.removeItem("chat_id");
    if (error) throw error;
  }

  // console.log(chatId);

  async function handleSubmit() {
    try {
      if (ongoingPromt.trim() !== "") {
        const { data, error } = await supabase
          .from("messages")
          .insert([
            {
              chat_id: chatId,
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
      console.log("error in sending messages");
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("message_id,sender,content")
          .eq("chat_id", chatId)
          .order("timestamp", { ascending: true });

        if (error) throw error;
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log("Messages retrieval failed");
      }
    }
    if (chatId && user) {
      fetchMessages();
    }
  }, [chatId, ongoingPromt]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          setUser(null);
          return;
        }
        console.log();
        setUser(data.user.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      const chat_id = sessionStorage.getItem("chat_id");
      console.log(chat_id);

      if (!chat_id && user) {
        try {
          const { data, error } = await supabase
            .from("chats")
            .insert([
              {
                user_id: user,
                start_time: new Date(), // Current timestamp
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
          sessionStorage.setItem("chat_id", insertedChatId.toString());
        } catch (error) {
          console.error("Error inserting chat:", error);
        }
      } else {
        setChatId(chat_id);
      }
    }

    fetchData();
  }, [user]); // Include user in dependency array to re-run effect when user changes

  useEffect(() => {
    // Scroll to the bottom when messages change
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scroll({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };
    scrollToBottom()
  }, [messages]);

  async function handleSignInWithGoogle(response: any) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
    });
    console.log(data);
  }

  return (
    <>
      <div className=" flex h-screen">
        <ScrollArea
          className="min-w-[22rem] max-w-[22rem]  rounded-md border p-4 bg-[#F9F9F9] 
        "
        >
          {/* sidebar nav bar */}
          <div className="bg-[#F9F9F9] py-3 px-4 flex justify-between items-center sticky top-0 ">
            <div className="flex items-center gap-2">
              <Image
                className="rounded-full border-1 text-black"
                src={"/logo.svg"}
                alt="Logo"
                width={30}
                height={30}
              />
              <div className="text-black font-semibold">New Chat</div>
            </div>
            <div>
              <FiEdit className="text-xl" />
            </div>
          </div>

          {/* History */}
          <div className="pt-10">
            <div>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by J okester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </div>
            <div>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </div>
            <div>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </div>
            <div>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king's pillow, in
              his soup, even in the royal toilet. The king was furious, but he
              couldn't seem to stop Jokester. And then, one day, the people of
              the kingdom discovered that the jokes left by Jokester were so
              funny that they couldn't help but laugh. And once they started
              laughing, they couldn't stop.
            </div>
          </div>

          {user ? (
            <>
              <div className="flex sticky bottom-0 bg-[#F9F9F9] px-5 pb-4 pt-6 gap-3 items-center">
                <Image
                  src={"/user.png"}
                  alt="user"
                  width={40}
                  height={40}
                  className="flex-none"
                />
                <div className="grow font-[500]">Tanay Srivastava</div>
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
            <div className="flex justify-between px-6 py-3 items-center">
              <div className="text-xl">
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
            <ScrollArea className="grow  w-full pb-4 ">
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

{
  /* <div
        id="g_id_onload"
        data-client_id="114615926093-lau02iplo5dcvgemjjpp5nbbqpn1c7fg.apps.googleusercontent.com"
        data-context="signup"
        data-ux_mode="popup"
        data-callback={handleSignInWithGoogle}
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div> */
}
