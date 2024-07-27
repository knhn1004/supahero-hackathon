"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "@/hooks/supabase";
import Link from "next/link";

export default function Login({ name }: { name: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = () => {
    console.log(email, password);
    if (name == "Sign in") signIn({ email, password });
    if (name == "Sign up") signUp({ email, password });
  };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 border-[1px] rounded-md border-black px-5 py-10">
      <div className="text-2xl mb-6">{name}</div>
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        placeholder="Email"
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="Password"
      />
      <Button variant="default" onClick={submit}>
        {name}
      </Button>
      <div>
        {name == "Sign in" ? (
          <>
            {"Don't have an account? "} <Link href={"/signup"}> Sign up </Link>
          </>
        ) : (
          <>
            {"Already has an account? "} <Link href={"/signin"}>Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}
