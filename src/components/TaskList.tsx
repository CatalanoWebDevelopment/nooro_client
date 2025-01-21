"use client";

import Button from "@/components/ui/Button";
import PlusIcon from "@/components/ui/PlusIcon";
import EmptyList from "@/components/EmptyList";

export default function TaskList() {
  return (
    <>
      <Button
        onClick={() => {}}
        className="mt-[-25px] h-[50px] w-3/4 flex justify-center items-center"
      >
        Add Task <PlusIcon className="ml-2" />
      </Button>

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

            <div className="flex-1 overflow-y-auto">
              <EmptyList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
