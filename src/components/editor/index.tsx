import { $getRoot, $getSelection, type EditorState } from "lexical";

import { TRANSFORMERS } from "@lexical/markdown";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ToolbarPlugin from "./plugins/toolbar/toolbarPlugin";
import { AutoFocusPlugin } from "./plugins/autoFocus";

const Placeholder = () => {
  return <div className="absolute top-[74px] opacity-50">Start writing...</div>;
};

function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

export const Editor: React.FunctionComponent = () => {
  return (
    <div
      id="editor-wrapper"
      className={
        "prose prose-slate prose-p:my-0 prose-headings:mb-4 prose-headings:mt-2 relative"
      }
    >
      <ToolbarPlugin />

      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />

      <OnChangePlugin onChange={onChange} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <LinkPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </div>
  );
};
