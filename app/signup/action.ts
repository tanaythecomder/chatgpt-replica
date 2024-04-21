"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = createClient();
  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { data, error } = await supabase.auth.signUp(inputData);
  console.log(data);
  if (error) {
    console.log(error);
    redirect("/error");
  }
  if (data.user) {
    // Get user ID
    const userId = data.user.id;
    console.log(data);
    try {
      // Insert a new record into the 'profiles' table
      const { error } = await supabase.from("profiles").insert({
        id: userId,
        email: formData.get("email") as string,
        username: formData.get("username") as string,
      });
      if (error) {
        console.error("Error creating profile:", error);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
