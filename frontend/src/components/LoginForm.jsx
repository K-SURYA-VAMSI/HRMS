import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState("employee");
  const [error, setError] = useState("");
  
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password, activeRole);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">WorkWise HRMS</CardTitle>
        <CardDescription>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeRole} onValueChange={(v) => setActiveRole(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="employee" className="flex items-center gap-2">
              <Users size={16} />
              <span>Employee</span>
            </TabsTrigger>
            <TabsTrigger value="hr" className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>HR Admin</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="employee">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="employee-email">Email</Label>
                <Input
                  id="employee-email"
                  type="email"
                  placeholder="employee@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-password">Password</Label>
                <Input
                  id="employee-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In as Employee"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="hr">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="hr-email">Email</Label>
                <Input
                  id="hr-email"
                  type="email"
                  placeholder="hr@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hr-password">Password</Label>
                <Input
                  id="hr-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In as HR Admin"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="text-sm text-center text-gray-500">
          <Link to="/forgot-password" className="text-hrms-purple hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-hrms-purple hover:underline">
            Register here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm; 