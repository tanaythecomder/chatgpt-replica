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
    // console.log(error);
    redirect("/error");
  }
  
  if (data.user) {
    // Get user ID
    const userId = data.user.id;
    // console.log(data);
    try {
      // Insert a new record into the 'profiles' table
      const { data, error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: formData.get("username") as string, email:formData.get("email") as string }) // Assuming 'username' is the variable holding the new value
        .eq("id", userId);
      // const { error } = await supabase.from("profiles").insert({
      //   id: userId,
      //   email: formData.get("email") as string,
      //   username: formData.get("username") as string,
      // });
      if (updateError) {
        console.error("Error creating profile:", updateError);
      }

    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
