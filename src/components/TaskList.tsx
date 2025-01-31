"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PlusIcon from "@/components/ui/PlusIcon";
import EmptyList from "@/components/EmptyList";
import TaskCard from "@/components/TaskCard";
import Alert from "@/components/Alert";
import { Task } from "@/types/Task";
import { Input } from "@/components/ui/Input";
import { debounce } from "lodash";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [_searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<Task[] | null>(null);

  const completedCount = tasks.filter((task) => task.completed).length;

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async (query: string) => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    try {
      const response = await fetch(`/api/tasks/search/${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to search tasks:", error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchValue(query);
      performSearch(query);
    }, 500),
    []
  );

  const handleOnChange = (query: string) => {
    setInputValue(query);
    debouncedSearch(query);
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    if (!taskToDelete) return;

    try {
      await fetch(`/api/tasks/${taskToDelete}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setTaskToDelete(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Button className="mt-[-25px] h-[50px] w-3/4 flex justify-center items-center">
        <Link
          href="/tasks/new"
          className="flex items-center h-full w-full justify-center"
        >
          Create Task <PlusIcon className="ml-2" />
        </Link>
      </Button>

      <section className="w-3/4 mt-4">
        <Input
          style={{ width: "100%", color: "#FFF" }}
          placeholder="Search tasks..."
          value={inputValue}
          onChange={(e) => handleOnChange(e.target?.value)}
        />
      </section>

      <section
        className="flex flex-col flex-1 items-center justify-center w-full overflow-hidden my-8"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <div className="flex flex-col items-center w-full h-full">
          <div className="h-full w-3/4 flex flex-col">
            <div className="flex justify-between items-center text-sm">
              <div className="text-secondary">
                Tasks{" "}
                <span className="bg-foreground text-white px-2 py-1 rounded-full">
                  {tasks.length}
                </span>
              </div>

              <div className="text-purple-400">
                Completed{" "}
                <span className="bg-foreground text-white px-2 py-1 rounded-full">
                  {completedCount} of {tasks.length}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading && (
                <div className="text-gray-400 my-8">Loading...</div>
              )}
              {!isLoading && tasks.length === 0 && <EmptyList />}
              {!isLoading &&
                ((searchResults?.length ?? 0) > 0 || tasks.length > 0) &&
                (searchResults ?? tasks).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={() => setTaskToDelete(task.id)}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>

      <Alert
        open={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the task."
        onConfirm={handleDelete}
      />
    </>
  );
}
