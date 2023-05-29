import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

type UseEditorSave = () => {
  saveEditorState: () => Promise<void>;
};

export const useEditorSave: UseEditorSave = () => {
  const [editor] = useLexicalComposerContext();

  const saveEditorState = async (): Promise<void> => {
    const stringifiedEditorState = JSON.stringify(editor.getEditorState());
    try {
      await fetch("http://localhost:1235/setEditorState", {
        body: stringifiedEditorState,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
      });
    } catch {
      // NO-OP
    }
  };

  return {
    saveEditorState,
  };
};
