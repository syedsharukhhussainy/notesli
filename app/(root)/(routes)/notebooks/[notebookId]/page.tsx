"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { Loader2, Wand2 } from "lucide-react";
import { ReactNode } from "react";

interface NoteBookIdProps {
  params: {
    notebookId: Id<"notebooks">;
  };
}

const NoteBookId = ({ params }: NoteBookIdProps) => {
  const notebook = useQuery(api.notebooks.getNotebookById, {
    notebookId: params.notebookId,
  });

  if (notebook === undefined) {
    return (
      <div className="flex justify-center items-center w-full mt-36 ">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (notebook === null) {
    return <div>Not found</div>;
  }

  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="h-10 w-10 text-white" />;
    }
    return undefined;
  };

  return (
    <div className="py-20 px-14">
      <div className=" flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <div
            style={{
              backgroundColor: notebook?.color!,
            }}
            className="w-16 h-16 flex items-center justify-center rounded-2xl"
          >
            {noteIcon(notebook?.icon!)}
          </div>
          <div>
            <h2 className="text-3xl font-bold capitalize">{notebook?.title}</h2>
            <p className="text-muted-foreground text-sm">
              {format(new Date(notebook._creationTime), "do MMM yyy")}
            </p>
          </div>
        </div>
        <Button className="text-base">
          Ask AI
          <Wand2 className="ml-4 w-5 h-5" />
        </Button>
      </div>
      <div className="mt-10">
        <Editor onChange={() => {}} initialContent={notebook.content} />
      </div>
    </div>
  );
};

export default NoteBookId;
