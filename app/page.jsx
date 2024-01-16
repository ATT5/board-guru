"use client";
import Board from "@/components/Board";
import Header from "@/components/Header";
import NewTask from "@/components/NewTask";
import Example from "@/components/Example";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

export default function Home() {
  const context = useContext(BoardContext);

  return (
    <main className="w-full relative ">
      {context.closeExample && <Example />}
      <Header />
      <Board />
      {context.newTask.open && <NewTask />}
    </main>
  );
}
