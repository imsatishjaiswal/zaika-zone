import { useState, useRef, type KeyboardEvent } from "react";
import { useTitle } from "react-meta-hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Loader2, ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  useTitle("Verify Email | Zaika Zone");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const data = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < data.length; i++) {
      newOtp[i] = data[i] || "";
    }
    setOtp(newOtp);
    // Focus the last input or the next empty one
    const nextIndex = Math.min(data.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const verificationCode = otp.join("");

    if (verificationCode.length < 6) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Email verified successfully!");
      navigate("/");
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
              Verify Email
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 text-center max-w-[280px]">
              We&apos;ve sent a 6-digit verification code to your email. Please
              enter it below.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-8">
            <div className="flex justify-center gap-2 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none text-zinc-900 dark:text-white"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading || otp.some((d) => !d)}
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                className="font-semibold text-orange-500 hover:text-orange-600 transition-colors focus:outline-none"
              >
                Resend Code
              </button>
            </p>
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

export default VerifyEmail;
