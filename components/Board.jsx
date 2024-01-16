"use client";

import Column from "./Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

const Board = () => {
  const context = useContext(BoardContext);

  const onDragEndHandler = (event) => {
    const { destination, source, draggableId } = event;

    context.tasksHandler(destination, source, draggableId);
  };

  return (
    <div className="w-full px-3 md:px-14 ">
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className=" flex flex-col md:flex-row items-start justify-around  gap-10">
          {context.state.columnOrder.map((columnId) => {
            const column = context.state.columns[columnId];

            const task = column.taskIds.map(
              (taskId) => context.state.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={task} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
