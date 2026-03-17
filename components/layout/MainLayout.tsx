import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500 opacity-10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400 opacity-10 blur-[120px] rounded-full"></div>

      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />

        <main className="p-8">
          {children}
        </main>
      </div>

    </div>
  );
}