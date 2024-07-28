import Dropzone from "@/components/Dropzone";
import { Input } from "@/components/ui/input";
import React from "react";

const Page = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Input
        className="w-[200px]"
        disabled
        type="email"
        placeholder="Phone number"
      />
    </div>
  );
};

export default Page;
