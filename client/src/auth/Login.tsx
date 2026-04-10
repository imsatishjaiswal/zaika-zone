import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Mail, Lock, Loader2 } from "lucide-react";
// interface LoginInput {
//   email: string;
//   password: string;
// }
// interface LoginInputWithAge extends LoginInput {
//   age: string;
// }
type LoginInput = {
  email: string;
  password: string;
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("input", input);

    setLoading(true);
    // Simulate login for now
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex flex-col items-center mb-10">
            <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
              <span className="text-white text-2xl font-bold italic">Z</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Zaika Zone
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Welcome back! Please login to your account.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <Mail className="size-4" />
                </div>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={input.email}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={input.password}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98] mt-4 shadow-lg shadow-orange-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
