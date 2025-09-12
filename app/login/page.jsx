"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import ShipmentContext from "@/contexts/ShipmentContext";

export default function Page() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user, setUser, rem, setRem } = useContext(ShipmentContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (password === "") {
      setError("Password is required");
      valid = false;
    }    if (valid) {
      try {
        setIsLoading(true);
        
        // Use regular Firebase authentication
        const userCredential = await signInWithEmailAndPassword(auth, name, password);
        setUser(userCredential.user.email);
        if (rem && typeof window !== 'undefined') {
          localStorage.setItem("user", userCredential.user.email);
        }
        router.push("/admin");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Invalid credentials. Please try again.");
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left Section with Image */}
      <div className="lg:hidden flex h-[30vh] relative">
        <img 
          src="/images/login.jpg" 
          alt="Logistics" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white px-6 py-4">
            <h1 className="text-3xl font-bold mb-2">CertifiedFreight Logistics</h1>
            <p className="text-base text-blue-100">Streamlined shipping solutions</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/images/login.jpg" 
          alt="Logistics" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Global Logistics</h1>
            <p className="text-xl text-blue-100">Streamlined shipping solutions for your business</p>
          </div>
        </div>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 min-h-[70vh] lg:min-h-screen">
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="loader">
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
              <div className="loader-square"></div>
            </div>
          </div>
        )}

        <div className="w-full max-w-[95%] sm:max-w-lg">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Welcome Back</h2>
            <p className="text-lg sm:text-xl text-blue-200">Sign in to your account</p>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-lg p-8 sm:p-10 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Email Input */}
              <div className="space-y-3">
                <label htmlFor="name" className="block  font-medium text-blue-100">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 border border-white/10 text-white rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all
                             placeholder-blue-200/60 backdrop-blur-sm text-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                <label htmlFor="password" className="block  font-medium text-blue-100">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-white/10 border border-white/10 text-white rounded-lg 
                             focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all
                             placeholder-blue-200/60 backdrop-blur-sm text-lg"
                    placeholder="••••••••"
                  />
                  <i
                    onClick={() => setShowPass(!showPass)}
                    className={`fa ${showPass ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-1/2 -translate-y-1/2 
                               text-blue-200 cursor-pointer hover:text-white transition-colors`}
                  ></i>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rem}
                  onChange={() => setRem(!rem)}
                  className="w-5 h-5 rounded bg-white/10 border-white/10 text-blue-500 focus:ring-blue-400"
                />
                <label htmlFor="rememberMe" className="text-lg text-blue-100">
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg py-4 px-6 rounded-lg
                           hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Sign In
              </button>
            </form>

            {error && (
              <p className="mt-6 text-red-400 text-center text-lg font-medium bg-red-500/10 py-3 rounded-lg">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
