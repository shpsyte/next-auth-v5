import React, { PropsWithChildren } from "react";
import Navbar from "./_components/navbar";

type PropsLayout = {};
export default function Layout({ children }: PropsWithChildren<PropsLayout>) {
  return (
    <>
      <div className="flex w-full h-full gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <Navbar />
        {/* {children} */}
      </div>
    </>
  );
}
