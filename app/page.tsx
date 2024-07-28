"use client";

import Dropzone from "@/components/Dropzone";
import { scrapeAndSummarize } from "@/lib/scraper";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

// Create a single supabase client for interacting with your database

export default function Home() {
  useEffect(() => {
    const getData = async () => {
      const summary = await scrapeAndSummarize();
      console.log(summary[0]);
    };
    getData();
  }, []);

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Dropzone />
    </main>
  );
}
