import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export function WelcomeLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // check if user exists
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    // validate credentials
    if (email !== user.email || password !== user.password) {
      setError("Invalid email or password");
      return;
    }

    // success
    setError("");
  navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart className="w-12 h-12 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              DonateConnect
            </h1>
          </div>

          <h2 className="text-3xl font-semibold text-gray-800">
            Donating necessary items to people in need
          </h2>

          <p className="text-lg text-gray-600">
            A platform where people can donate essentials like food and
            clothing, especially during emergencies like natural disasters.
            We organize donation drives and connect donors with those in
            need to improve their living conditions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                For Donors
              </h3>
              <p className="text-sm text-gray-600">
                List items, track donations, and participate in emergency
                drives
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">
                For Recipients
              </h3>
              <p className="text-sm text-gray-600">
                Request items, track delivery, and provide feedback
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              {/* Button */}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Sign In
              </Button>

              {/* Register */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}