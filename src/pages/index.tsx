import { type NextPage } from "next";
import Head from "next/head";
import { Editor } from "~/components/editor";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-base leading-7 text-gray-700">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Note Taking App
          </h1>
          <div className="">
            <Editor />
          </div>
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
