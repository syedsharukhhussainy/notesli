import UploadButton from "@/components/upload-button";
import { BookText } from "lucide-react";
import NotebookLists from "./_components/notebooks-list";

const Notebooks = () => {
  return (
    <div className="pt-20 px-10 ">
      <div className=" flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <BookText className="h-8 w-8 text-muted-foreground" />
          <h2 className="text-2xl font-bold">My Notebooks</h2>
        </div>
        <UploadButton />
      </div>
      <NotebookLists />
    </div>
  );
};

export default Notebooks;
