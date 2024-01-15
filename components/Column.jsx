"use client";
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";
const Column = ({ column, tasks }) => {
  const x = useContext(BoardContext);

  console.log(x);

  return (
    <div className="w-5/6 md:w-1/5 flex flex-col flex-grow   rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 ">
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <>
            <h2 className="w-full p-2 font-bold text-xl">{column.title}</h2>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={` p-2 h-full rounded-md ${
                snapshot.isDraggingOver ? "bg-green-300" : ""
              }`}
            >
              {tasks.map((task, index) => {
                return <Task key={task.id} task={task} index={index} />;
              })}
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
      <div className=" flex justify-end p-2 rounded-xl">
        <button className="w-10 h-10 bg-green-400 rounded-full text-center active:bg-green-600">
          +
        </button>
      </div>
    </div>
  );
};

export default Column;
