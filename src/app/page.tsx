import Logo from "@/components/Logo";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full">
      <header className="flex flex-col items-center justify-center w-full h-[20%] bg-dark min-h-[125px] max-h-[250px]">
        <Logo />
      </header>

      <section
        className="flex flex-col flex-1 items-center justify-center w-full"
        style={{ backgroundColor: "#1A1A1A" }}
      >
        <TaskList />
      </section>
    </main>
  );
}
