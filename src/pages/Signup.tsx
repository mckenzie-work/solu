import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthCard from "@/components/AuthCard";

const Logo = () => (
  <div className="flex items-center justify-center">
    <span className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
      SBS
    </span>
  </div>
);

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with real API call to send OTP
      if (!formData.username || !formData.phone) {
        throw new Error("Please fill in all fields");
      }
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate(`/verify-otp?phone=${encodeURIComponent(formData.phone)}&username=${encodeURIComponent(formData.username)}`);
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account" logo={<Logo />}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            required
            placeholder="Enter your username"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Enter your phone number"
            className="mt-1"
          />
        </div>

        {error && (
          <div className="text-destructive text-sm animate-pulse">{error}</div>
        )}

        <Button type="submit" className="w-full font-semibold" disabled={loading}>
          {loading ? (
            <span className="animate-spin inline-block mr-2">⏳</span>
          ) : null}
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button
            variant="link"
            className="p-0 h-auto text-primary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </form>
    </AuthCard>
  );
};

export default Signup;