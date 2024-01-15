"use client";
import { initialData } from "@/app/initial-data";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";
import { useState } from "react";

const Board = () => {
  const [state, setState] = useState(initialData);

  const onDragEndHandler = (event) => {
    const { destination, source, draggableId } = event;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);

      //Remove the select element from the Array
      newTaskIds.splice(source.index, 1);
      //Relocates the element in the Array
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    //Moving from one list to another one

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    console.log({ [newFinish.id]: 2 });
    setState(newState);
  };

  return (
    <div className="w-full px-5 ">
      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className=" flex flex-col md:flex-row max-lg:items-center md:justify-around  gap-10">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];

            const task = column.taskIds.map((taskId) => state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={task} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
