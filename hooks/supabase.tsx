"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || ""
);

export const useFile = () => {
  const [file, setFile] = useState<File>();
  const uploadFile = async () => {
    if (!file) {
      alert("upload the file first");
      return;
    }
    const { data, error } = await supabase.storage
      .from("documents")
      .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      alert(error.message);
      return;
    }

    console.log(data, error);
  };

  return {
    file,
    setFile,
    uploadFile,
  };
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    alert(error.message);
    return;
  }
  console.log(data);
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    alert(error.message);
    return;
  }
  console.log(data);
};
