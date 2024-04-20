"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState<null | {}>(null);

  async function checkUser() {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
    if (error || !data.user) throw error;
    return data;
  }
  async function signOut() {
    console.log("logged out", user);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    if (error) throw error;
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    checkUser()
      .then((res) => {
        console.log(res.user);
        setUser(res.user);
      })
      .catch(() => setUser(null));

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

          <div className="h-full flex flex-col justify-center items-center overflow-y-auto">
            <ScrollArea className="grow w-full  ">
              <div className="flex justify-center">
                <div className="w-[68%]  ">
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                  fkanfkankjankanfafnksanfksnkfnkjnnfanmn
                </div>
              </div>
            </ScrollArea>

            <Input
              className="w-[68%] flex mb-10 py-8 rounded-2xl text-lg pl-8 outline-none ring-0 shadow-md"
              type="email"
              placeholder="Message ChatGPT.."
            />
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
