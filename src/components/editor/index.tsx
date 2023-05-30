import { TextNode } from "lexical";

import { TRANSFORMERS } from "@lexical/markdown";

import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ToolbarPlugin from "./plugins/toolbar/toolbarPlugin";
import { AutoFocusPlugin } from "./plugins/autoFocus";
import {
  INSERT_YOUTUBE_COMMAND,
  YoutubeLinkPlugin,
} from "./plugins/youtube/youtubeLink";
import { getYoutubeId } from "~/utils/lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

const Placeholder = () => {
  return <div className="absolute top-[74px] opacity-50">Start writing...</div>;
};

export const Editor: React.FunctionComponent = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerNodeTransform(TextNode, (textNode) => {
      const youtubeId = getYoutubeId(textNode.getTextContent());

      if (youtubeId) {
        textNode.remove();
        editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, youtubeId);
      }
    });
  }, [editor]);

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

      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <LinkPlugin />
      <YoutubeLinkPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </div>
  );
};
