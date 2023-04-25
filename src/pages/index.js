import React from "react";
import Link from "next/link";
import Head from "next/head";

function index() {
  return (
    <div className="bg-zinc-950 flex items-center justify-center h-screen">
      <Head>
        <title>Todo NextJs App</title>
      </Head>
      <h1 className="text-3xl text-white font-bold text-center pr-6">
        To-do list
      </h1>
      <Link className="text-white" href="/tasks">
        View all tasks
      </Link>
    </div>
  );
}

export default index;
