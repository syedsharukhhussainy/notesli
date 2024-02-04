"use client";

import {
  Block,
  BlockNoteEditor,
  BlockSchemaFromSpecs,
  PartialBlock,
} from "@blocknote/core";
import {
  BlockNoteView,
  FormattingToolbarPositioner,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
  useBlockNote,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  TextAlignButton,
  CreateLinkButton,
  ColorStyleButton,
  DefaultFormattingToolbar,
  BlockTypeDropdown,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { Heading2, Wand2 } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    >
      <FormattingToolbarPositioner
        editor={editor}
        formattingToolbar={CustomFormattingToolbar}
      />
      <HyperlinkToolbarPositioner editor={editor} />
      <SlashMenuPositioner editor={editor} />
      <SideMenuPositioner editor={editor} />
    </BlockNoteView>
  );
};

export default Editor;

const CustomFormattingToolbar = ({ editor }: { editor: BlockNoteEditor }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Toolbar>
      <BlockTypeDropdown editor={editor} />
      <ToggledStyleButton editor={editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={editor} toggledStyle={"underline"} />
      <ToggledStyleButton editor={editor} toggledStyle={"strike"} />
      <TextAlignButton editor={editor} textAlignment={"left"} />
      <TextAlignButton editor={editor} textAlignment={"center"} />
      <TextAlignButton editor={editor} textAlignment={"right"} />
      <CustomDialog editor={editor}>
        <ToolbarButton mainTooltip="Edit with AI">
          <Wand2 className="w-4 h-4" />
        </ToolbarButton>
      </CustomDialog>
    </Toolbar>
  );
};

const CustomDialog = ({
  children,
  editor,
}: {
  children: ReactNode;
  editor: BlockNoteEditor;
}) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm text-muted-foreground">Edit selection</h5>
          <Separator />
          <div
            role="button"
            className="text-sm hover:bg-secondary transition p-2 rounded-md"
            onClick={() => {
              console.log(editor.getSelectedText());
              editor.insertBlocks(
                [
                  {
                    content: editor.getSelectedText() + " " + "asdasdasdasd",
                  },
                ],
                editor.getTextCursorPosition().block,
                "after"
              );
            }}
          >
            Fix spelling and grammar
          </div>
          <AskAIDrawer
            editor={editor}
            title="Short summary"
            description="Make a short summary of selected text."
          >
            <div
              role="button"
              className="text-sm hover:bg-secondary transition p-2 rounded-md"
            >
              Make a short summary
            </div>
          </AskAIDrawer>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface AskAIDrawerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  editor: BlockNoteEditor;
}

const AskAIDrawer = ({
  children,
  title,
  description,
  editor,
}: AskAIDrawerProps) => {
  console.log(formatText(editor.getSelection()?.blocks));
  console.log(editor.getSelection()?.blocks);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-5xl">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="flex text-sm">
              <p className="text-muted-foreground mr-2">
                {/* {formatText(editor.getSelection()?.blocks)} */}
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const formatText = (blocks: any) => {
  let formattedText = "";

  blocks.map((block: any) => {
    if (block.content[0]) {
      if (block.type === "heading") {
        block.content?.map((t: any) => {
          if (t.type === "text") {
            formattedText += t.text + ": ";
          }
        });
        formattedText += "\n\n";
      }

      if (block.type === "paragraph") {
        block.content?.map((t: any) => {
          if (t?.type === "text") {
            formattedText += t.text;
          }
          if (t?.type === "link") {
            t.content?.map((l: any) => {
              formattedText += l?.text;
            });
            formattedText += " (" + t?.href + ")";
          }
        });
        formattedText += "\n\n";
      }
      if (block.type === "bulletListItem") {
        block.content?.map((t: any) => {
          if (t?.type === "text") {
            formattedText += t.text;
          }
          if (t?.type === "link") {
            t.content?.map((l: any) => {
              formattedText += l?.text;
            });
            formattedText += " (" + t?.href + ")";
          }
        });
        formattedText += "\n\n";
      }
    }
  });

  return formattedText;
};
