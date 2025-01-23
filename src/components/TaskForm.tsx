"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Task } from "@/types/Task";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import PlusIcon from "@/components/ui/PlusIcon";
import CheckmarkIcon from "@/components/ui/CheckmarkIcon";

interface TaskFormProps {
  initialData?: Task;
}

const COLORS = [
  { value: "red", bg: "bg-[#FF6B6B]" },
  { value: "orange", bg: "bg-[#FF9F43]" },
  { value: "yellow", bg: "bg-[#FECA57]" },
  { value: "green", bg: "bg-[#48C9B0]" },
  { value: "blue", bg: "bg-[#4B7BEC]" },
  { value: "indigo", bg: "bg-[#4B6584]" },
  { value: "purple", bg: "bg-[#A55EEA]" },
  { value: "pink", bg: "bg-[#FF6B81]" },
  { value: "brown", bg: "bg-[#A0522D]" },
];

export default function TaskForm({ initialData }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [color, setColor] = useState(initialData?.color || COLORS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const url = initialData ? `/api/tasks/${initialData.id}` : "/api/tasks";

      const method = initialData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, color }),
      });

      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center py-8 w-3/4">
      <Link
        href="/"
        className="inline-flex items-center text-white hover:text-gray-300 mb-8 w-full"
      >
        <ArrowLeftIcon />
      </Link>

      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-400">
            Title
          </label>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Brush you teeth"
            className="bg-[#1A1A1A] border-0 text-gray-300 placeholder:text-gray-500 py-6 text-base"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-blue-400">
            Color
          </label>

          <div className="flex flex-wrap gap-3">
            {COLORS.map((c) => (
              <button
                key={c.bg}
                type="button"
                onClick={() => setColor(c.bg)}
                className={`w-10 h-10 rounded-full ${
                  c.bg
                } transition-transform ${
                  color === c.bg
                    ? "ring-2 ring-offset-2 ring-offset-[#111111] ring-blue-400 scale-110"
                    : "hover:scale-110"
                }`}
                aria-label={`Select ${c.bg} color`}
              />
            ))}
          </div>
        </div>

        <Button
          props={{
            type: "submit",
            disabled: isSubmitting,
          }}
          className="h-[50px] flex w-full justify-center items-center"
        >
          {isSubmitting ? "Saving..." : initialData ? "Save" : "Add Task"}

          {!isSubmitting && !initialData && <PlusIcon className="ml-2" />}
          {!isSubmitting && initialData && <CheckmarkIcon className="ml-2" />}
        </Button>
      </form>
    </div>
  );
}
