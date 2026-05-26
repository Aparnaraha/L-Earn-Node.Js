import { useState } from "react";
import axios from "axios"; 
import { themeStyles } from "./themeStyles";

export default function LoginPage({ onLoginSuccess, currentToken, onSignOut, styles = themeStyles }) {
  // Toggle between 'login' and 'register' views
  const [view, setView] = useState("login"); 
  
  // Form Fields
  const [name, setName] = useState(""); // Only used for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Feedback States
  const [feedbackMessage, setFeedbackMessage] = useState({ text: "", isError: false });
  const [loading, setLoading] = useState(false); 

  // Clear messages when swapping views
  const switchView = (newView) => {
    setView(newView);
    setFeedbackMessage({ text: "", isError: false });
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage({ text: "", isError: false });

    // Validation
    if (view === "register" && !name) {
      setFeedbackMessage({ text: "Please enter your name.", isError: true });
      return;
    }
    if (!email || !password) {
      setFeedbackMessage({ text: "Please enter both email and password.", isError: true });
      return;
    }

    try {
      setLoading(true);
      
      // Determine backend route based on active view
      const endpoint = view === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = view === "login" ? { email, password } : { name, email, password };

      const response = await axios.post(endpoint, payload);

      if (view === "login") {
        if (response.data && response.data.token) {
          onLoginSuccess(response.data.token);
        }
      } else {
        // Registration success logic
        setFeedbackMessage({ 
          text: "Registration successful! You can now sign in.", 
          isError: false 
        });
        setView("login"); // Send them back to login page
      }

    } catch (error) {
      console.error(`Axios ${view} error:`, error);
      const serverMessage = error.response?.data?.message;
      
      setFeedbackMessage({
        text: serverMessage || "Connection failed. Please verify your backend server proxy configuration.",
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  // --- IF USER IS ALREADY LOGGED IN: SHOW SIGN OUT VIEW ---
  if (currentToken) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded border border-gray-100 shadow-xs text-center">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Active Admin Session
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            You are currently authenticated into the terminal portal.
          </p>
        </div>

        <button
          onClick={onSignOut}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded transition-colors"
        >
          Sign Out of Terminal
        </button>
      </div>
    );
  }

  // --- STANDARD AUTHENTICATION VIEW (LOGIN / REGISTER) ---
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded border border-gray-100 shadow-xs">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {view === "login" ? "Secure Admin Portal" : "Create Admin Account"}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          {view === "login" ? "Sign in with your database credentials" : "Register new terminal profile access"}
        </p>
      </div>

      {feedbackMessage.text && (
        <div className={`mb-4 p-2.5 text-xs border rounded ${
          feedbackMessage.isError 
            ? "text-red-600 bg-red-50 border-red-100" 
            : "text-green-600 bg-green-50 border-green-100"
        }`}>
          {feedbackMessage.text}
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
        {/* Registration Only field: Name */}
        {view === "register" && (
          <div>
            <label className="block font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Mercer"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@test.com"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded transition-colors mt-2"
        >
          {loading ? "Processing..." : view === "login" ? "Sign In to Terminal" : "Register Profile"}
        </button>
      </form>

      {/* Dynamic View Switcher Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
        {view === "login" ? (
          <p>
            Don't have an account?{" "}
            <button onClick={() => switchView("register")} className="text-blue-600 hover:underline font-medium">
              Register here
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => switchView("login")} className="text-blue-600 hover:underline font-medium">
              Sign in here
            </button>
          </p>
        )}
      </div>
    </div>
  );
}