import { useState, type ChangeEvent } from "react";
import { useTitle } from "react-meta-hooks";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import {
  userResetPasswordSchema,
  type ResetPasswordInput,
} from "@/schema/userSchema";

const ResetPassword = () => {
  useTitle("Reset Password | Zaika Zone");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<ResetPasswordInput>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<ResetPasswordInput>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    // Clear error when user types
    if (errors[name as keyof ResetPasswordInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = userResetPasswordSchema.safeParse(input);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const errorMessages: Partial<ResetPasswordInput> = {};
      Object.keys(fieldErrors).forEach((key) => {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          errorMessages[key as keyof ResetPasswordInput] = messages[0];
        }
      });
      setErrors(errorMessages);
      return;
    }

    setErrors({});
    setLoading(true);

    // Simulate API call
    console.log("Updating password...");
    setTimeout(() => {
      setLoading(false);
      alert(
        "Your password has been reset successfully. You can now log in with your new password.",
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
              Reset Password
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center">
              Please enter your new password below to secure your account.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                New Password
              </Label>
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
                  className={`pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                Confirm New Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={input.confirmPassword}
                  onChange={handleInputChange}
                  className={`pl-10 h-11 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                    {errors.confirmPassword}
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
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

export default ResetPassword;
