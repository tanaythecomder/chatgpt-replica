"use client"
import { createClient } from "@/utils/supabase/client";
import React from "react";

const page = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*");
  console.log(data, error,"haa yahi hun");
  return <div>hiii</div>;
};

export default page;
