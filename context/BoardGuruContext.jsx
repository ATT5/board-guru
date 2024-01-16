"use client";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const BoardContext = createContext(null);

const BoardGuruContext = ({ children }) => {
  // Load state from localStorage or use a default state
  const initialState = JSON.parse(localStorage.getItem("boardState")) || {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };

  const [newTask, setNewTask] = useState({ open: false, column: "" });
  const [state, setState] = useState(initialState);
  const [closeExample, setCloseExample] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Save state to localStorage whenever it changes
      localStorage.setItem("boardState", JSON.stringify(state));
    }
  }, [state]);

  const handleExample = () => setCloseExample(false);

  const openNewTaskHandler = (column) =>
    setNewTask({ open: true, column: column });

  const closeNewTaskHandler = () => setNewTask({ open: false, column: "" });

  //Add new task to the state 🆕
  const addTaskHandler = (newTask, selectedColumnId) => {
    // Create a copy of the state to avoid directly mutating it
    const newState = { ...state };

    newState.tasks[newTask.id] = {
      id: newTask.id,
      content: newTask.content,
      img: newTask.imageUrl,
    };

    // Add the new task ID to the taskIds array of the selected column
    newState.columns[selectedColumnId].taskIds.push(newTask.id);

    setState(newState);
  };

  // delete tasks 🔥
  const deleteTaskHandler = (task, columnId) => {
    const newState = { ...state };

    // Remove the task from the tasks object
    delete newState.tasks[task.id];

    // Remove the task ID from the taskIds array of the associated column
    newState.columns[columnId].taskIds = newState.columns[
      columnId
    ].taskIds.filter((id) => id !== task.id);

    // Set the updated state
    setState(newState);
  };

  //handle the moves of the tasks 🚀
  const tasksHandler = (destination, source, draggableId, type) => {
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //Reordering columns
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);

      return;
    }

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

    setState(newState);
  };

  return (
    <BoardContext.Provider
      value={{
        state,
        newTask,
        closeExample,
        handleExample,
        tasksHandler,
        openNewTaskHandler,
        closeNewTaskHandler,
        addTaskHandler,
        deleteTaskHandler,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardGuruContext;
