import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  UtensilsCrossed,
  Settings,
  PlusSquare,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock authentication state
  const isAuthenticated = true;
  const isAdmin = true; // Switch this to false to see user view

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-8 bg-orange-500 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
            <Utensils className="size-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white italic">
            Zaika Zone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            {isAuthenticated && !isAdmin && (
              <>
                <Link
                  to="/orders"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className="relative text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <ShoppingBag className="size-5" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    0
                  </span>
                </Link>
              </>
            )}
            {isAuthenticated && isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <LayoutDashboard className="size-4" /> Dashboard
                </Link>
                <Link
                  to="/admin/menu"
                  className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <UtensilsCrossed className="size-4" /> Menu
                </Link>
                <Link
                  to="/admin/restaurant"
                  className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  <Settings className="size-4" /> Restaurant
                </Link>
              </>
            )}
          </div>

          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="size-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-zinc-300 dark:border-zinc-700">
                  <User className="size-5 text-zinc-500" />
                </div>
                <ChevronDown
                  className={`size-4 text-zinc-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <User className="size-4" /> Profile
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left">
                    <LogOut className="size-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block text-base font-medium text-zinc-900 dark:text-white"
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <LayoutDashboard className="size-5" /> Dashboard
                    </Link>
                    <Link
                      to="/admin/menu"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <UtensilsCrossed className="size-5" /> Menu Management
                    </Link>
                    <Link
                      to="/admin/restaurant"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <Settings className="size-5" /> Restaurant Settings
                    </Link>
                    <Link
                      to="/admin/add-menu"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <PlusSquare className="size-5" /> Add Menu Item
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/orders"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <ShoppingBag className="size-5" /> My Orders
                    </Link>
                    <Link
                      to="/cart"
                      onClick={toggleMenu}
                      className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                    >
                      <ShoppingBag className="size-5" /> Cart (0)
                    </Link>
                  </>
                )}
                <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4" />
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 text-base font-medium text-zinc-900 dark:text-white"
                >
                  <User className="size-5" /> Profile
                </Link>
                <button className="w-full flex items-center gap-2 text-base font-medium text-red-500 text-left">
                  <LogOut className="size-5" /> Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="ghost" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full justify-center bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
