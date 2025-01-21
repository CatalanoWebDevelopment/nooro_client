"use client";

import ClipboardIcon from "@/components/ui/ClipboardIcon";

export default function EmptyList() {
  return (
    <div className="flex-1 mt-4 border-t border-foreground">
      <section className="mt-12 flex flex-col items-center">
        <ClipboardIcon className="text-foreground" />

        <p className="text-textSecondary mt-4 font-bold">
          You don't have any tasks registered yet.
        </p>

        <p className="text-textSecondary mt-2">
          Create tasks and organize your to-do items.
        </p>
      </section>
    </div>
  );
}
