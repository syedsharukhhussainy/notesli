"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNotebookDialog from "./add-notebook-dialog";

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="text-base sm:h-11 h-9 flex justify-between px-5 rounded-md">
          <span className="sm:flex hidden">Add Notebook</span>
          <Plus className="sm:ml-3 w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">
            Add Notebook
          </DialogTitle>
        </DialogHeader>
        <AddNotebookDialog setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
