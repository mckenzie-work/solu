import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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

const VerifyOtp: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const query = useQuery();
  const phone = query.get("phone") || "";
  const username = query.get("username") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: Replace with real API call to verify OTP
      if (otp !== "123456") {
        throw new Error("Invalid OTP. Use 123456 for demo.");
      }
      // Mock login as customer
      login({
        id: "new-customer",
        phone_number: phone,
        username,
        role: "customer",
        token: "fake-customer-token",
      });
      navigate(`/complete-profile?phone=${encodeURIComponent(phone)}&username=${encodeURIComponent(username)}`);
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Verify OTP" logo={<Logo />}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="otp">Enter the OTP sent to {phone}</Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
            placeholder="Enter 6-digit OTP (123456 for demo)"
            maxLength={6}
            className="mt-1 bg-white/60 dark:bg-black/40 border border-white/30 dark:border-gray-700 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition"
          />
        </div>
        {error && <div className="text-red-500 text-sm animate-pulse">{error}</div>}
        <Button type="submit" className="w-full font-semibold shadow-lg" disabled={loading}>
          {loading ? (
            <span className="animate-spin inline-block mr-2">⏳</span>
          ) : null}
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </AuthCard>
  );
};

export default VerifyOtp;