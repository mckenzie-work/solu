import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";

const Logo = () => (
  <div className="flex items-center justify-center">
    <span className="text-2xl font-black bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">SBS</span>
  </div>
);

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  // Login state
  const [identifier, setIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      let userData;
      if (!identifier || !loginPassword) {
        throw new Error("Please enter your username/phone and password");
      }
      let role: string = "customer";
      if (
        identifier === "admin" ||
        identifier === "admin@example.com"
      ) {
        if (loginPassword !== "adminpass") throw new Error("Invalid credentials");
        role = "admin";
      } else if (loginPassword === "password") {
        if (identifier.match(/\d+0$/)) {
          role = "technician";
        } else {
          role = "customer";
        }
      } else {
        throw new Error("Invalid credentials");
      }
      userData = {
        id: role === "admin" ? "1" : role === "customer" ? "2" : "3",
        username: identifier,
        phone_number: identifier.match(/^\d+$/) ? identifier : undefined,
        role,
        token: `fake-${role}-token`,
      };
      login(userData);
      if (role === "admin") navigate("/admin");
      else if (role === "technician") navigate("/technician");
      else navigate("/dashboard");
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Signup handler
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    setSignupLoading(true);
    try {
      if (!signupPhone || !signupPassword || !signupUsername) {
        throw new Error("Phone, username, and password are required");
      }
      // TODO: Replace with real API call to send OTP
      // Mock: always succeed
      navigate(`/verify-otp?phone=${encodeURIComponent(signupPhone)}&username=${encodeURIComponent(signupUsername)}`);
    } catch (err: any) {
      setSignupError(err.message || "Signup failed");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <AuthCard logo={<Logo />}>
      <div className="flex w-full justify-center mb-6">
        <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full shadow-inner p-1 w-full max-w-xs relative">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-base transition-colors duration-200 focus:outline-none z-10
              ${tab === 'login'
                ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow'
                : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
            onClick={() => setTab('login')}
            aria-selected={tab === 'login'}
            aria-controls="login-panel"
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-full font-semibold text-base transition-colors duration-200 focus:outline-none z-10
              ${tab === 'signup'
                ? 'bg-white dark:bg-black text-gray-900 dark:text-white shadow'
                : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
            onClick={() => setTab('signup')}
            aria-selected={tab === 'signup'}
            aria-controls="signup-panel"
          >
            Sign Up
          </button>
          <span
            className={`absolute top-1 left-1 h-9 w-1/2 rounded-full bg-gray-100 dark:bg-gray-900 shadow transition-all duration-300 z-0
              ${tab === 'signup' ? 'translate-x-full' : 'translate-x-0'}`}
            style={{ transitionProperty: 'transform, background-color' }}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8" />
      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-5" id="login-panel">
          <div>
            <Label htmlFor="identifier">Username or Phone</Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              autoComplete="username"
              placeholder="Enter your username or phone number"
              required
              className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
            />
          </div>
          <div className="relative">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type={showLoginPassword ? "text" : "password"}
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowLoginPassword(v => !v)}
              className="absolute right-2 top-8 text-xs text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              tabIndex={-1}
              aria-label={showLoginPassword ? "Hide password" : "Show password"}
            >
              {showLoginPassword ? "Hide" : "Show"}
            </button>
          </div>
          {loginError && <div className="text-red-500 text-sm animate-pulse">{loginError}</div>}
          <Button type="submit" className="w-full font-semibold shadow-lg" disabled={loginLoading}>
            {loginLoading ? (
              <span className="animate-spin inline-block mr-2">⏳</span>
            ) : null}
            {loginLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-5" id="signup-panel">
          <div>
            <Label htmlFor="signup-phone">Phone Number</Label>
            <Input
              id="signup-phone"
              type="tel"
              value={signupPhone}
              onChange={e => setSignupPhone(e.target.value)}
              autoComplete="tel"
              required
              placeholder="e.g. 1234567890"
              className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
            />
          </div>
          <div>
            <Label htmlFor="signup-username">Username</Label>
            <Input
              id="signup-username"
              type="text"
              value={signupUsername}
              onChange={e => setSignupUsername(e.target.value)}
              autoComplete="username"
              required
              placeholder="Your username"
              className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition"
            />
          </div>
          <div className="relative">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type={showSignupPassword ? "text" : "password"}
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowSignupPassword(v => !v)}
              className="absolute right-2 top-8 text-xs text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              tabIndex={-1}
              aria-label={showSignupPassword ? "Hide password" : "Show password"}
            >
              {showSignupPassword ? "Hide" : "Show"}
            </button>
          </div>
          {signupError && <div className="text-red-500 text-sm animate-pulse">{signupError}</div>}
          <Button type="submit" className="w-full font-semibold shadow-lg" disabled={signupLoading}>
            {signupLoading ? (
              <span className="animate-spin inline-block mr-2">⏳</span>
            ) : null}
            {signupLoading ? "Sending OTP..." : "Sign Up"}
          </Button>
        </form>
      )}
    </AuthCard>
  );
};

export default Login;