import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Briefcase, FileText, CalendarCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Employee Dashboard | WorkWise HRMS";
  }, []);

  return (
    <Layout requiredRole="employee">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your workplace activities and tools.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Status</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Present</div>
              <p className="text-xs text-muted-foreground">
                Checked in at 09:15 AM
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <p className="text-xs text-muted-foreground">
                Annual leave remaining
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Due this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Internal job openings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link 
                to="/dashboard/attendance" 
                className="flex items-center p-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                <Clock className="mr-2 h-5 w-5" />
                <span>Mark Attendance</span>
              </Link>
              <Link 
                to="/dashboard/leave-requests" 
                className="flex items-center p-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                <CalendarCheck className="mr-2 h-5 w-5" />
                <span>Request Leave</span>
              </Link>
              <Link 
                to="/dashboard/job-roles" 
                className="flex items-center p-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                <span>View Job Openings</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Annual Leave</p>
                    <p className="text-xs text-muted-foreground">May 10-12, 2025</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Pending</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Sick Leave</p>
                    <p className="text-xs text-muted-foreground">April 5, 2025</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Approved</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="border-b pb-2">
                  <p className="font-medium">Team Meeting</p>
                  <p className="text-xs text-muted-foreground">Today, 2:00 PM</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Project Deadline</p>
                  <p className="text-xs text-muted-foreground">Apr 25, 2025</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Company Offsite</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 