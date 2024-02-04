"use client";

import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ROUTES } from "@/lib/constants";
import Link from "next/link";
import { ScrollText, Search } from "lucide-react";
import Item from "./item";
import ThemeToggle from "./theme-toggle";
import UserItem from "./user-item";
// import { useSearch } from "@/hooks/use-search";

const Sidebar = () => {
  const pathName = usePathname();
  const params = useParams();

  // const search = useSearch();

  return (
    <aside className="group/sidebar  border-r relative flex w-64 flex-col h-screen">
      <div>
        <div className="h-16 w-full  flex items-center px-6 gap-2">
          <ScrollText className="w-7 h-7" />
          <h1 className="text-2xl font-bold">Notesli</h1>
        </div>
        <Separator />
      </div>
      <div className="h-full flex flex-col justify-between gap-4 p-3">
        <div>
          <Item label="Search" icon={Search} onClick={() => {}} />
          <div className="flex flex-col gap-3 mt-10">
            {SIDEBAR_ROUTES.map((route, index) => (
              <div key={index}>
                <Link
                  href={route.href}
                  className={cn(
                    "flex gap-3 text-sm items-center font-medium text-muted-foreground p-3 hover:bg-secondary hover:text-primary transition-colors rounded-md",
                    pathName === route.href && "bg-secondary text-primary"
                  )}
                >
                  <route.icon />
                  <span>{route.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <UserItem />
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
