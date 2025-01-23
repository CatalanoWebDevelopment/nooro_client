"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/types/Task";
import Logo from "@/components/Logo";
import TaskForm from "@/components/TaskForm";

export default function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/tasks/${id}`);

        if (!response.ok) {
          throw new Error("Task not found");
        }

        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Failed to fetch task:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id, router]);

  if (!task) {
    return null;
  }

  return (
    <main className="flex flex-col items-center h-full">
      <header className="flex flex-col items-center justify-center w-full h-[20%] bg-dark min-h-[125px] max-h-[250px]">
        <Logo />
      </header>

      {isLoading && <div className="text-grey-400 my-8">Loading...</div>}
      {!isLoading && <TaskForm initialData={task} />}
    </main>
  );
}
