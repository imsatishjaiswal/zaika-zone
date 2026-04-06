import { Link, Outlet } from "react-router-dom";
import { Utensils } from "lucide-react";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/30 dark:bg-zinc-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-8 bg-orange-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Utensils className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white italic">
              Zaika Zone
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-orange-500 px-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer (Optional but good for premium feel) */}
      <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} Zaika Zone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
