import { useState, type ChangeEvent } from "react";
import { useTitle } from "react-meta-hooks";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { userForgotPasswordSchema } from "@/schema/userSchema";

const ForgotPassword = () => {
  useTitle("Forgot Password | Zaika Zone");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(undefined);
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = userForgotPasswordSchema.safeParse({ email });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setError(fieldErrors.email?.[0]);
      return;
    }

    setError(undefined);
    setLoading(true);

    // Simulate API call
    console.log("Sending reset link to:", email);
    setTimeout(() => {
      setLoading(false);
      alert(
        "If an account exists for " +
          email +
          ", you will receive a password reset link shortly.",
      );
    }, 2000);
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
              Forgot Password?
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
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
                  value={email}
                  onChange={handleInputChange}
                  className={`pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    error ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {error && (
                  <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                    {error}
                  </p>
                )}
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
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
