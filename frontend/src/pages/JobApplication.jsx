import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import JobApplicationForm from "../components/JobApplicationForm";

const JobApplication = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect if not authenticated or not an employee
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (user?.role !== 'employee') {
    return <Navigate to="/hr-dashboard" />;
  }

  // Redirect if already applied
  if (user?.applicationStatus !== 'not_applied') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply for a Position</h1>
          <p className="mt-2 text-gray-600">
            Complete the form below to apply for a position at our company
          </p>
        </div>
        <JobApplicationForm />
      </div>
    </div>
  );
};

export default JobApplication; 