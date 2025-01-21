"use client";

import Button from "@/components/ui/Button";
import PlusIcon from "@/components/ui/PlusIcon";

export default function TaskList() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <Button
        onClick={() => {}}
        className="mb-4 mt-[-25px] h-[50px] w-3/4 flex justify-center items-center"
      >
        Add Task <PlusIcon className="ml-2" />
      </Button>

      <section className="flex-1 w-3/4 mb-4">
        <div className="flex justify-between items-center text-sm">
          <div className="text-secondary">
            Tasks{" "}
            <span className="bg-foreground text-white px-2 py-1 rounded-full">
              0
            </span>
          </div>

          <div className="text-purple-400">
            Completed{" "}
            <span className="bg-foreground text-white px-2 py-1 rounded-full">
              0 of 0
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
