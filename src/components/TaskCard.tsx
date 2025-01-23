"use client";

import { Task } from "@/types/Task";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import TrashIcon from "@/components/ui/TrashIcon";
import Link from "next/link";
import EditIcon from "./ui/EditIcon";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: () => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onDelete,
}: TaskCardProps) {
  return (
    <div
      className={`group flex items-center mt-6 p-4 rounded-lg transition-colors bg-foreground`}
    >
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          onToggleComplete(task.id, !task.completed);
        }}
      >
        <Checkbox checked={task.completed} className={`${task.color}`} />
      </div>

      <p
        className={`flex-1 ml-3 flex items-baseline ${
          task.completed ? "line-through text-white" : "text-white"
        }`}
      >
        {task.title}
      </p>

      <Link
        href={`/tasks/${task.id}`}
        className="hover:text-primary text-textSecondary mr-3"
      >
        <button className="flex justify-center items-center">
          <EditIcon className="size-4" />
        </button>
      </Link>

      <button onClick={onDelete}>
        <TrashIcon className="text-textSecondary hover:text-[#FF0000]" />
      </button>
    </div>
  );
}
