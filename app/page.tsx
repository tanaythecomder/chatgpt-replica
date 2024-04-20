"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import { FiUpload } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const supabase = createClient();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

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
          className="min-w-80 max-w-80  rounded-md border p-4 bg-[#F9F9F9] 
        "
        >
          {/* sidebar nav bar */}
          <div className="bg-[#F9F9F9] py-3 px-4 flex justify-between items-center sticky top-0 ">
            <div className="flex items-center gap-2">
              <Image className="rounded-full border-1 text-black" src={"/logo.svg"} alt="Logo" width={30} height={30} />
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


          <div className="flex sticky bottom-0 bg-[#F9F9F9] px-5 pb-4 pt-6 gap-3 items-center">
            <Image src={"/user.png"} alt="user" width={40} height={40} className="flex-none" />
            <div className="grow font-[500]">Tanay Srivastava</div>
            
          </div>
        </ScrollArea>
        <main className="w-full h-screen flex flex-col justify-center items-center">
          <div className="w-full">
            <div className="flex justify-between px-6 py-3 items-center">
              <div className="text-xl">
                <span className="font-semibold dark:text-white">ChatGPT</span>{" "}
                <span className="text-gray-300">3.5</span>
              </div>
              <Button className="bg-white text-black border-2 shadow-none rounded-xl ">
                <FiUpload className="text-xl" />
              </Button>
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
