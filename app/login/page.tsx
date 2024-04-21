"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { login } from "./action";
import { createClient } from "@/utils/supabase/client";

// declare global {
//   interface Window {
//     handleSignInWithGoogle: (response: any) => Promise<void>; // Declare handleSignInWithGoogle globally
//   }
// }

const formSchema = z.object({
  email: z.string().email({
    message: "Please provide valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
});
const handleSignInWithGoogle = async (response: any) => {
  const supabase = createClient(); // Create Supabase client

  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce: "NONCE", // Must be the same one as provided in data-nonce (if any)
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    } else {
      console.log("User signed in with Google:", data.user);
      // Redirect or perform additional actions after successful sign-in
    }
  } catch (error) {
    console.error("Error signing in with Google:", error);
    // Handle error
  }
};

const Login = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    console.log(values);
    login(formData);
  }
  return (
    <div className="flex flex-col items-center justify-center pt-[5%]  tracking-wide">
      <Image
        src={"/logo.svg"}
        alt="logo"
        height={75}
        width={75}
        className="filter grayscale invert"
      />
      <div className="text-black font-bold text-4xl pt-24">Welcome Back</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[340px] pt-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>email</FormLabel> */}
                <FormControl>
                  <Input
                    className="py-6 border-2"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Username</FormLabel> */}
                <FormControl>
                  <Input
                    className="py-6 border-2"
                    placeholder="Passoword"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#10a37f] py-7 text-lg">
            Submit
          </Button>
        </form>
      </Form>
      <div className="text-sm pt-1">
        <span>Don't have an account?</span>{" "}
        <Link className="text-[#10a37f]" href={"/signup"}>
          Signup
        </Link>
      </div>

      <div>
        <div
          id="g_id_onload"
          data-client_id="114615926093-m87h2n42a55jo5lgfbit90qqm45h9843.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-callback="handleSignInWithGoogle"
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
        ></div>
      </div>
    </div>
  );
};

export default Login;
