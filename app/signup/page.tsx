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
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { signup } from "./action";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const formSchema = z.object({
  email: z.string().email({
    message: "Please provide valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 2 characters.",
  }),
  username: z.string().min(5, {
    message: "Provide valid username",
  }),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("username", values.username);

    signup(formData);
  }
  return (
    <div className="flex flex-col items-center justify-center pt-[5%]  tracking-wide">
      <Image
        src={"/logo.svg"}
        alt="logo"
        height={75}
        width={75}
        className="filter grayscale"
      />
      <div className="text-black font-bold text-4xl pt-24">Welcome Back</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-[340px] pt-10"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="py-6 border-2"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="py-6 border-2"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="py-6 border-2 w-full"
                      placeholder="Password"
                      {...field}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />

                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-4 text-xl"
                    >
                      {showPassword ? (
                        <>
                          <BiSolidHide />
                        </>
                      ) : (
                        <BiSolidShow />
                      )}
                    </button>
                  </div>
                </FormControl>

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
        <span>Have an account?</span>{" "}
        <Link className="text-[#10a37f]" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
