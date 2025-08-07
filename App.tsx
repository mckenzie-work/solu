
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import AuthTabs from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import CompleteProfile from "./pages/CompleteProfile";

const queryClient = new QueryClient();

// Placeholder dashboard components
const CustomerDashboard = () => <div className="p-8">Customer Dashboard (Coming Soon)</div>;
const TechnicianDashboard = () => <div className="p-8">Technician Dashboard (Coming Soon)</div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthTabs />} />
              <Route path="/auth" element={<AuthTabs />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/technician" element={
                <ProtectedRoute requiredRole="technician">
                  <TechnicianDashboard />
                </ProtectedRoute>
              } />
              <Route path="/booking" element={<Booking />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
