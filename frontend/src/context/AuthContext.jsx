import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authAPI } from "../services/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user and token in localStorage
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("hrms_user");
      const token = localStorage.getItem("hrms_token");
      
      if (storedUser && token) {
        try {
          // Verify token by getting current user
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          // If token is invalid, clear storage
          localStorage.removeItem("hrms_user");
          localStorage.removeItem("hrms_token");
          console.error("Auth verification error:", error);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    
    try {
      // Call login API
      const response = await authAPI.login({ email, password, role });
      
      if (!response.token || !response.user) {
        throw new Error("Invalid response from server");
      }

      // Store token and user data
      localStorage.setItem("hrms_token", response.token);
      localStorage.setItem("hrms_user", JSON.stringify(response.user));
      setUser(response.user);
      
      toast.success(`Welcome, ${response.user.name}!`);
      
      // Navigate based on role
      if (response.user.role === "hr") {
        navigate("/hr-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      // Call register API
      const response = await authAPI.register(userData);
      
      if (!response.token || !response.user) {
        throw new Error("Invalid response from server");
      }

      // Store token and user data
      localStorage.setItem("hrms_token", response.token);
      localStorage.setItem("hrms_user", JSON.stringify(response.user));
      setUser(response.user);
      
      toast.success(`Welcome, ${response.user.name}!`);
      
      // Navigate based on role
      if (response.user.role === "hr") {
        navigate("/hr-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hrms_user");
    localStorage.removeItem("hrms_token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    
    try {
      await authAPI.forgotPassword(email);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to send reset instructions";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, password) => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.resetPassword({ token, password });
      if (!response.token) {
        throw new Error("Invalid response from server");
      }
      localStorage.setItem("hrms_token", response.token);
      toast.success("Password reset successful");
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Password reset failed";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword
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