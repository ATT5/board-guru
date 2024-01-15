import { Draggable } from "@hello-pangea/dnd";
import { deleteIcon } from "@/assets";
import Image from "next/image";
const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`w-full  my-2 p-2 rounded-lg flex justify-between  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ${
            snapshot.isDragging ? "bg-blue-100" : "bg-white/90"
          }`}
        >
          {task.content}
          <Image
            alt="delete"
            src={deleteIcon}
            width={30}
            height={30}
            className="cursor-pointer "
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
