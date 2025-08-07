import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Logo = () => (
  <div className="flex items-center justify-center">
    <span className="text-2xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">SBS</span>
  </div>
);

const CompleteProfile: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const phone = query.get("phone") || "";
  const username = query.get("username") || "";
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with real API call to update profile
    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };

  return (
    <AuthCard title="Complete Your Profile" logo={<Logo />}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center text-gray-600 dark:text-gray-300 mb-2">
          Welcome, <span className="font-semibold">{username}</span>!<br />
          Phone: <span className="font-mono">{phone}</span>
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            placeholder="Enter your full name"
            className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition"
          />
        </div>
        <Button type="submit" className="w-full font-semibold shadow-lg" disabled={loading}>
          {loading ? (
            <span className="animate-spin inline-block mr-2">⏳</span>
          ) : null}
          {loading ? "Saving..." : "Complete Profile"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default CompleteProfile;