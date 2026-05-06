import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/30 dark:bg-zinc-950">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} Zaika Zone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
