import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { type InitialConfigType } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { type EditorThemeClasses } from "lexical";
import { YouTubeNode } from "./plugins/youtube/youtubeNode";

const EDITOR_NODES = [
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  YouTubeNode,
];

const theme: EditorThemeClasses = {
  root: "py-4 h-full min-h-[200px] focus:outline-none focus-visible:border-black",
  link: "text-blue-400 underline",
  heading: {
    h1: "text-5xl text-gray-700 font-extrabold py-4 dark:text-white",
    h2: "text-4xl text-gray-700 font-extrabold py-2 dark:text-white",
    h3: "text-3xl text-gray-700 font-bold dark:text-white",
  },
  text: {
    bold: "font-semibold",
    underline: "underline",
    italic: "italic",
    strikethrough: "line-through",
    underlineStrikethrough: "underlined-line-through",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "p-0 m-0 ml-[16px]",
    ul: "p-0 m-0 ml-[16px]",
    listitem: "my-[8px] mx-[32px]",
  },
  code: "bg-slate-200 p-[8px] my-[8px]",
  quote: "m-0 ml-[20px] pl-[16px] border-l-2 border-slate-200",
};

export const editorConfig: InitialConfigType = {
  namespace: "note-editor",
  theme,
  nodes: EDITOR_NODES,

  onError: (err: Error) => console.log("Error", err.message),
};
