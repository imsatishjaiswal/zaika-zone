import { useState, type ChangeEvent } from "react";
import { useTitle } from "react-meta-hooks";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Mail, Lock, Loader2, User, Phone } from "lucide-react";
import { userSignUpSchema, type SignupInput } from "@/schema/userSchema";

// type SignupInput = {
//   fullName: string;
//   email: string;
//   mobileNumber: string;
//   password: string;
// };
const Signup = () => {
  useTitle("Sign Up | Zaika Zone");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<SignupInput>({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignupInput>>({});
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    // Clear the error for this specific field as the user types
    if (errors[id as keyof SignupInput]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };
  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = userSignUpSchema.safeParse(input);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      // Convert arrays of strings into single strings for your state
      const errorMessages: Partial<SignupInput> = {};
      Object.keys(fieldErrors).forEach((key) => {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          errorMessages[key as keyof SignupInput] = messages[0]; // Take the first message
        }
      });
      setErrors(errorMessages);
      return;
    }
    // Clear errors if validation is successful
    setErrors({});
    console.log("input", input);
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
              <span className="text-white text-2xl font-bold italic">Z</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Zaika Zone
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                Full Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <User className="size-4" />
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  value={input.fullName}
                  type="text"
                  placeholder="John Doe"
                  onChange={handleInputChange}
                  className={`pl-10 h-10 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.fullName ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
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
                  value={input.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`pl-10 h-10 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="mobileNumber"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                Mobile Number
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <Phone className="size-4" />
                </div>
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  value={input.mobileNumber}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={`pl-10 h-10 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.mobileNumber
                      ? "border-red-500 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1"
              >
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none transition-colors group-focus-within:text-orange-500 text-zinc-400">
                  <Lock className="size-4" />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`pl-10 h-10 bg-zinc-50/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all rounded-xl ${
                    errors.password ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98] mt-4 shadow-lg shadow-orange-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-orange-500 hover:text-orange-600 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
