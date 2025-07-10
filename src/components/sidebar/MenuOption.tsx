"use client";

import {
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@/generated/prisma";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useModel } from "@/provider/model-provider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Menu, Compass, ChevronsUpDown, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { Separator } from "../ui/separator";
import CustomModel from "../global/CustomModel";

type props = {
  defaultOpen?: boolean;
  subaccount: SubAccount[];
  sidebarOption: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

export default function MenuOption({
  defaultOpen,
  subaccount,
  sidebarLogo,
  sidebarOption,
  details,
  user,
  id,
}: props) {
  const { setOpen } = useModel();
  const [isMounted, setIsMounted] = useState(false);
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );
  console.log(openState);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <>
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="sr-only">Logo Header</SheetTitle>{" "}
            {/* Accessible but hidden */}
            <AspectRatio ratio={16 / 5}>
              <Image
                src="/logo.png"
                alt="Sidebar Logo"
                fill
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </SheetHeader>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className="w-full h-auto rounded-md my-2"
              >
                <div className="flex justify-between my-1 items-center w-full mx-1 rounded-lg py-2 px-2 border-2">
                  <Compass />
                  <div className="flex flex-col">
                    <h1 className="truncate">Meet</h1>
                    <span className="text-muted-foreground text-wrap truncate">
                      A-72
                    </span>
                  </div>
                  <ChevronsUpDown size={16} />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-80 overflow-y-hidden mt-4 z-[200]">
              <Command>
                <CommandInput placeholder="Search Account..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {(user?.role === "AGENCY_OWNER" ||
                    user?.role === "AGENCY_ADMIN") &&
                    user?.Agency && (
                      <CommandGroup heading="Agency">
                        <CommandItem className="!bg-transparent hover:!bg-muted p-2">
                          {defaultOpen ? (
                            <Link
                              href={`/agency/${user?.Agency?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={user?.Agency?.agencyLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="truncate">
                                <h2 className="truncate text-sm font-medium leading-5">
                                  {user?.Agency?.name}
                                </h2>
                                <p className="truncate text-xs text-muted-foreground">
                                  {user?.Agency?.address}
                                </p>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="truncate flex flex-col">
                                  <h2 className="truncate text-sm font-medium leading-5">
                                    {user?.Agency?.name}
                                  </h2>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {user?.Agency?.address}
                                  </p>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      </CommandGroup>
                    )}
                  <CommandGroup heading="Accounts">
                    {subaccount.length > 0 ? (
                      subaccount.map((sub) => (
                        <CommandItem key={sub.id}>
                          {defaultOpen ? (
                            <Link
                              href={`/subaccount/${sub?.id}`}
                              className="flex gap-4 w-full h-full"
                            >
                              <div className="relative w-16">
                                <Image
                                  src={sub?.subAccountLogo}
                                  alt="Agency Logo"
                                  fill
                                  className="rounded-md object-contain"
                                />
                              </div>
                              <div className="truncate">
                                <h2 className="truncate text-sm font-medium leading-5">
                                  {sub?.name}
                                </h2>
                                <p className="truncate text-xs text-muted-foreground">
                                  {sub?.address}
                                </p>
                              </div>
                            </Link>
                          ) : (
                            <SheetClose asChild>
                              <Link
                                href={`/subaccount/${sub?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={sub?.subAccountLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div>
                                <div className="truncate flex flex-col">
                                  <h2 className="truncate text-sm font-medium leading-5">
                                    {sub?.name}
                                  </h2>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {sub?.address}
                                  </p>
                                </div>
                              </Link>
                            </SheetClose>
                          )}
                        </CommandItem>
                      ))
                    ) : (
                      <div>No Accounts</div>
                    )}
                  </CommandGroup>
                </CommandList>
                {(user?.role === "AGENCY_OWNER" ||
                  user?.role === "AGENCY_ADMIN") && (
                  <SheetClose asChild>
                    <Button
                      className="w-full flex gap-2"
                      onClick={() =>
                        setOpen(
                          <CustomModel
                            title="Create a Subaccount"
                            subheading="You can switch between your agency account and the subaccount from the sidebar"
                          >
                            <div>kfbhs</div>
                          </CustomModel>
                        )
                      }
                    >
                      <PlusCircleIcon size={15} />
                      Create Sub Account
                    </Button>
                  </SheetClose>
                )}
              </Command>
            </PopoverContent>
          </Popover>
          <Separator />
          {/* <Command>
            <CommandInput placeholder="Search Account..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
              </CommandGroup>
            </CommandList>
          </Command> */}
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
