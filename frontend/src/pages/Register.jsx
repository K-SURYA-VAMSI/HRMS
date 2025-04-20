import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={user?.role === 'hr' ? '/hr-dashboard' : '/dashboard'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register; 