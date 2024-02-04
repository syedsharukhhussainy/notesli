"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNotebookSchema,
  createNotebookSchema,
} from "@/lib/validations/note";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import IconPicker from "./icon-picker";
import { DialogFooter } from "./ui/dialog";
import ColorPicker from "./color-picker";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import LoadingButton from "./loading-button";

const AddNotebookDialog = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const create = useMutation(api.notebooks.create);

  const form = useForm<CreateNotebookSchema>({
    resolver: zodResolver(createNotebookSchema),
    defaultValues: {
      title: "",
      icon: "Book",
      color: "#ef4444",
    },
  });

  const handleSubmit = (input: CreateNotebookSchema) => {
    const promise = create({
      title: input.title,
      color: input.color!,
      icon: input.icon!,
    });

    form.reset();
    setIsOpen(false);

    toast.promise(promise, {
      loading: "Creating a new notebook...",
      success: "New notebook created",
      error: "Failed to create a notebook",
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notebook name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Study Materials" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pick Icon</FormLabel>
                <FormControl>
                  <IconPicker onChange={field.onChange} value={field.value!} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pick Color</FormLabel>
                <FormControl>
                  <ColorPicker onChange={field.onChange} value={field.value!} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            Add Notebook
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddNotebookDialog;
