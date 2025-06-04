"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "@/components/ui/button";

type navbarProps = {
  user?: null | User;
};

export default function Navbar({ user }: navbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="flex top-0 left-0 right-0 fixed items-center p-2 z-10 bg-white dark:bg-black">
        <div className="flex items-center justify-between">
          <aside className="flex items-center">
            <img src={"/logo.png"} className="w-auto h-10" />
            <h1 className="font-bold text-2xl hidden sm:block">WebBuilder</h1>
          </aside>
          <div>
            <ul className="hidden md:flex items-center gap-4 text-[15px] left-[44%] right-[50%] transform translate-x-[-50%] translate-y-[-50%] absolute">
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[18px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex justify-end items-center w-full mr-3">
          <UserButton />
          <ModeToggle />
          <div className="flex flex-wrap items-center gap-2 mx-2 md:flex-row">
            <Button>
              <Link href="/agency/sign-in">Sign In</Link>
            </Button>
          </div>
          {!isOpen ? (
            <Menu className="sm:hidden mr-2" onClick={() => setIsOpen(true)} />
          ) : (
            <X className="sm:hidden mr-2" onClick={() => setIsOpen(false)} />
          )}
        </div>
        {isOpen && (
          <div className="absolute top-[90%] w-full">
            <ul className="sm:hidden flex flex-col gap-1 pl-4 pt-2 bg-white dark:bg-black w-full pb-2">
              <Link href={"/"} className="hover:text-blue-700">
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
              <Link
                href={"/"}
                className="hover:text-blue-700 hover:text-[16px]"
              >
                Home
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
