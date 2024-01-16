"use client";

import Column from "./Column";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useContext, useState, useEffect } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

const Board = () => {
  const context = useContext(BoardContext);
  const [direction, setDirection] = useState("horizontal");

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and set the direction accordingly
      if (window.innerWidth < 768) {
        setDirection("vertical");
      } else {
        setDirection("horizontal");
      }
    };

    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
  }, []);

  const onDragEndHandler = (event) => {
    const { destination, source, draggableId, type } = event;
    context.tasksHandler(destination, source, draggableId, type);
  };

  return (
    <div className="w-full px-3 md:px-14  mb-10">
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable
          droppableId="all-columns"
          direction={direction}
          type="column"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col md:flex-row items-center md:items-start justify-around gap-10"
            >
              {context.state.columnOrder.map((columnId, index) => {
                const column = context.state.columns[columnId];
                const task = column.taskIds.map(
                  (taskId) => context.state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={task}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
