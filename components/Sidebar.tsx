import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col w-[250px] border-r-2 border-black">
      <Link
        className="h-10 flex items-center border-b-[1px]"
        href={"/dashboard"}
      >
        Home
      </Link>
      <Link
        className="h-10 flex items-center border-b-[1px]"
        href={"/dashboard/upload"}
      >
        Upload file
      </Link>
    </div>
  );
};

export default Sidebar;
