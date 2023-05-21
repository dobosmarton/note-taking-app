import React from "react";
import type { LexicalEditor } from "lexical";
import {
  Text,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  ChevronDown,
} from "lucide-react";

import { $createCodeNode } from "@lexical/code";

import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  type HeadingTagType,
} from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection,
} from "lexical";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { Button } from "~/components/ui/button";

export const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

type Props = {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
  disabled?: boolean;
};

export const BlockFormatDropDown: React.FunctionComponent<Props> = ({
  blockType,
  editor,
  disabled,
}) => {
  const dropDownActiveClass = (active: boolean) =>
    active ? " bg-gray-200" : "";

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    console.log("format", blockType);

    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={disabled} variant="outline">
          {blockTypeToBlockName[blockType]}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "paragraph")}`}
          onClick={formatParagraph}
        >
          <Text size={14} />

          <span>Normal</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "h1")}`}
          onClick={() => formatHeading("h1")}
        >
          <Heading1 size={14} />
          <span>Heading 1</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "h2")}`}
          onClick={() => formatHeading("h2")}
        >
          <Heading2 size={14} />
          <span>Heading 2</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "h3")}`}
          onClick={() => formatHeading("h3")}
        >
          <Heading3 size={14} />
          <span>Heading 3</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "bullet")}`}
          onClick={formatBulletList}
        >
          <List size={14} />

          <span>Bullet List</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "number")}`}
          onClick={formatNumberedList}
        >
          <ListOrdered size={14} />
          <span className="text">Numbered List</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "quote")}`}
          onClick={formatQuote}
        >
          <Quote size={14} />
          <span>Quote</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`gap-2 ${dropDownActiveClass(blockType === "code")}`}
          onClick={formatCode}
        >
          <Code size={14} />
          <span>Code Block</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
