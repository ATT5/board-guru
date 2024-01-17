"use client";
import { checkIcon } from "@/assets";
import Image from "next/image";
import { useState, useContext } from "react";
import { BoardContext } from "@/context/BoardGuruContext";

const NewTask = () => {
  const context = useContext(BoardContext);

  const [taskName, setTaskName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [columnSelected, setColumnSelected] = useState(context.newTask.column);

  const typeOfTask = {
    "To do": {
      title: "To Do",
      description: "A new task",
      column: "column-1",
    },
    "In Progress": {
      title: "In Progress",
      description: "A task that is currently being worked on",
      column: "column-2",
    },
    Done: {
      title: "Done",
      description: "A task that has been completed",
      column: "column-3",
    },
  };

  const handleCloseNewTask = () => context.closeNewTaskHandler();

  const handleTaskNameChange = (e) => setTaskName(e.target.value);

  const handleImageUrlChange = (e) => setImageUrl(e.target.value);

  const handleColumnSelected = (column) => setColumnSelected(column);

  const handleAddNewTask = (e) => {
    e.preventDefault();

    const trimmedTaskName = taskName.trim();

    if (!trimmedTaskName) return;
    

    const newTaskId = `task-${Object.keys(context.state.tasks).length + 1}`;

    const newTask = {
      id: newTaskId,
      content: taskName,
      imageUrl: imageUrl,
    };

    context.addTaskHandler(newTask, columnSelected);

    setTaskName("");
    setImageUrl("");

    // Close the new task form
    handleCloseNewTask();
  };

  return (
    <>
      <div
        className=" w-full h-screen  absolute top-0 bottom-0 z-10 bg-black/30 "
        onClick={handleCloseNewTask}
      />
      <form
        action=""
        onSubmit={handleAddNewTask}
        className="bg-gray-50  w-5/6 md:w-1/2 p-9 rounded-lg flex flex-col gap-2 absolute top-10 left-0 right-0  mx-auto z-20 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
      >
        <h2 className="font-bold">Add a Task</h2>
        <input
          className=" border-2 p-4 rounded-md mb-4"
          type="text"
          placeholder="Enter a task here..."
          onChange={handleTaskNameChange}
          required
        />
        <input
          className=" border-2 p-4 rounded-md mb-4"
          type="text"
          placeholder="Add Image url..."
          onChange={handleImageUrlChange}
        />
        {Object.values(typeOfTask).map((task) => (
          <div
            onClick={() => handleColumnSelected(task.column)}
            key={task.title}
            className={`${
              columnSelected === task.column ? "bg-red-500" : "bg-white"
            } 
            p-3 rounded-md mb-4 cursor-pointer flex justify-between gap-2 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]`}
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>

            <Image src={checkIcon} alt="checkIcon" width={30} height={30} />
          </div>
        ))}
        <button className="self-start bg-green-400 py-2 px-4 rounded-lg active:bg-green-400">
          Add Task
        </button>
      </form>
    </>
  );
};

export default NewTask;
