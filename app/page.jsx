import Board from "@/components/Board";
import Header from "@/components/Header";
import BoardGuruContext from "@/context/BoardGuruContext";

export default function Home() {
  return (
    <main className="w-full  ">
      <BoardGuruContext>
        <Header />
        <Board />
      </BoardGuruContext>
    </main>
  );
}
