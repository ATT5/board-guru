"use client";
import { createContext } from "react";

export const BoardContext = createContext(null);

const tasks = {};

const BoardGuruContext = ({ children }) => {
  return (
    <BoardContext.Provider value={tasks}>{children}</BoardContext.Provider>
  );
};

export default BoardGuruContext;
