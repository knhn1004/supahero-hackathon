"use client";

import Dropzone from "@/components/Dropzone";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Dropzone />
    </main>
  );
}
