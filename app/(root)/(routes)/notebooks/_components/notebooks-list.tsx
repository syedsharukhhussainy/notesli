"use client";

import { api } from "@/convex/_generated/api";
import { getIconFile } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Ghost, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { format } from "date-fns";
const NotebookLists = () => {
  const notebooks = useQuery(api.notebooks.getNotebooks);

  const router = useRouter();
  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="h-8 w-8 text-white" />;
    }
    return undefined;
  };

  const handleOnClick = (notebookId: string) => {
    router.push(`/notebooks/${notebookId}`);
  };

  if (notebooks === undefined) {
    return (
      <div className="flex justify-center items-center w-full mt-36 ">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-16">
      {notebooks && notebooks?.length !== 0 ? (
        <div className="grid grid-cols-5 gap-5">
          {notebooks.map((notebook) => (
            <div
              key={notebook._id}
              onClick={() => handleOnClick(notebook._id)}
              className="border rounded-3xl p-5 hover:bg-secondary/80 transition cursor-pointer"
            >
              <div
                style={{
                  backgroundColor: notebook.color!,
                }}
                className="w-14 h-14 flex items-center justify-center rounded-2xl"
              >
                {noteIcon(notebook.icon!)}
              </div>
              <div className="mt-8">
                <p className="text-2xl font-bold  truncate">{notebook.title}</p>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(notebook._creationTime), "do MMM yyy")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-28 md:mt-36 flex flex-col items-center gap-2">
          <Ghost className="h-10 w-10 md:h-12 md:w-12" />
          <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
            You don&apos;t have any items yet
          </h3>
          <p className="text-muted-foreground text-xs md:text-xl">
            Let&apos;s upload your document{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default NotebookLists;
