"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGoogle() {
  const supabase = createClient();

  console.log(".....inside funtion");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/",
    },
  });
  
  console.log(data.url);
  if (error) {
    console.log(error);
  }

  redirect(data.url as string);
  // Return the response here
}
