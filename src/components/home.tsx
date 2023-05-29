import React from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { useEditorSave } from "~/hooks/useEditorSave";

export const Home: React.FunctionComponent = () => {
  const { saveEditorState } = useEditorSave();

  const onEditorSave = () => {
    saveEditorState().catch((err: Error) => {
      console.log("saveEditorState", err.message);
    });
  };

  return (
    <>
      <Header onSave={onEditorSave} />
      <main className="bg-white px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-base leading-7 text-gray-700">
          <Editor />
        </div>
      </main>
    </>
  );
};
