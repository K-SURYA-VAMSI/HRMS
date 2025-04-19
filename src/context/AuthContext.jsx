import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

// Mock user data - replace with actual API calls in production
const MOCK_USERS = [
  {
    id: "1",
    name: "HR Admin",
    email: "hr@example.com",
    password: "password123",
    role: "hr",
  },
  {
    id: "2",
    name: "John Employee",
    email: "employee@example.com",
    password: "password123",
    role: "employee",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("hrms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - replace with actual API
      const foundUser = MOCK_USERS.find(
        user => user.email === email && user.password === password && user.role === role
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("hrms_user", JSON.stringify(userWithoutPassword));
        
        toast.success(`Welcome, ${userWithoutPassword.name}!`);
        
        if (role === "hr") {
          navigate("/hr-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hrms_user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 