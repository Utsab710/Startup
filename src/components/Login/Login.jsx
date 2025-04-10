// src/components/Login/Login.jsx
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the login function from AuthContext
      await login(email, password);

      // Redirect based on role (optional)
      const user = JSON.parse(localStorage.getItem("user")) || {}; // Temporary, until fully integrated
      if (user.role === "admin") {
        navigate("/admin/blogs");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-full max-w-md m-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Logo/Header section */}
          <div className="bg-orange-600 p-8">
            <div className="text-center">
              <h1 className="text-white text-3xl font-bold">Welcome Back</h1>
              <p className="text-orange-200 mt-2">Sign in to your account</p>
            </div>
          </div>

          {/* Form section */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                <p className="font-medium mb-1">Error</p>
                <p>{error}</p>
                {error.includes("Unable to connect") && (
                  <p className="mt-2 text-xs">
                    Make sure your backend server is running at
                    http://localhost:8000
                  </p>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-orange-600 hover:text-orange-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>

          {/* Footer section */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
