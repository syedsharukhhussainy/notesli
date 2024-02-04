"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronLeft, ChevronsLeftRight, LogOut } from "lucide-react";

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex gap-x-3 text-sm items-center font-medium p-3 hover:bg-secondary hover:text-primary transition-colors rounded-md cursor-pointer group text-muted-foreground"
        >
          <div className="gap-x-3 flex items-center max-w-[150px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-3">
          <div className="flex items-center gap-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{user?.fullName}</p>
              <p className="text-xs font-medium leading-none  text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <div>Manage account</div>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
