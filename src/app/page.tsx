import Logo from "@/components/Logo";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full">
      <header className="flex flex-col items-center justify-center w-full h-[20%] bg-dark min-h-[125px] max-h-[250px]">
        <Logo />
      </header>

      <TaskList />
    </main>
  );
}
