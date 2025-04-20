
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, CalendarMinus, Filter, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

// Mock data for leave requests
const MOCK_LEAVE_REQUESTS = [
  { 
    id: "1", 
    employeeName: "John Doe",
    employeeId: "EMP001",
    department: "Engineering",
    position: "Senior Frontend Developer",
    leaveType: "Annual Leave",
    startDate: "2025-05-10",
    endDate: "2025-05-12",
    totalDays: 3,
    reason: "Family vacation",
    status: "Pending",
    appliedOn: "2025-04-15" 
  },
  { 
    id: "2", 
    employeeName: "Jane Smith",
    employeeId: "EMP002",
    department: "Design",
    position: "UX Designer",
    leaveType: "Sick Leave",
    startDate: "2025-04-25",
    endDate: "2025-04-25",
    totalDays: 1,
    reason: "Doctor's appointment",
    status: "Pending",
    appliedOn: "2025-04-20" 
  },
  { 
    id: "3", 
    employeeName: "Robert Johnson",
    employeeId: "EMP003",
    department: "Engineering",
    position: "Full Stack Developer",
    leaveType: "Personal Leave",
    startDate: "2025-04-28",
    endDate: "2025-04-28",
    totalDays: 1,
    reason: "DMV appointment",
    status: "Pending",
    appliedOn: "2025-04-18" 
  },
  { 
    id: "4", 
    employeeName: "Emily Davis",
    employeeId: "EMP004",
    department: "Product",
    position: "Product Manager",
    leaveType: "Annual Leave",
    startDate: "2025-05-05",
    endDate: "2025-05-09",
    totalDays: 5,
    reason: "Anniversary trip",
    status: "Approved",
    appliedOn: "2025-04-10",
    approvedOn: "2025-04-12",
    approvedBy: "HR Admin"
  },
  { 
    id: "5", 
    employeeName: "Michael Wilson",
    employeeId: "EMP005",
    department: "Infrastructure",
    position: "DevOps Engineer",
    leaveType: "Sick Leave",
    startDate: "2025-04-15",
    endDate: "2025-04-16",
    totalDays: 2,
    reason: "Not feeling well",
    status: "Approved",
    appliedOn: "2025-04-14",
    approvedOn: "2025-04-14",
    approvedBy: "HR Admin" 
  },
  { 
    id: "6", 
    employeeName: "Amanda Martinez",
    employeeId: "EMP006",
    department: "Marketing",
    position: "Marketing Specialist",
    leaveType: "Annual Leave",
    startDate: "2025-04-20",
    endDate: "2025-04-21",
    totalDays: 2,
    reason: "Personal event",
    status: "Rejected",
    appliedOn: "2025-04-10",
    rejectedOn: "2025-04-12",
    rejectedBy: "HR Admin",
    rejectionReason: "Critical project deadline that week"
  },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Mock departments
const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Marketing", "Infrastructure", "Finance", "HR", "Sales"];

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState<typeof MOCK_LEAVE_REQUESTS[0] | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = () => {
    toast.success(`Leave request for ${selectedLeave?.employeeName} approved!`);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    toast.success(`Leave request for ${selectedLeave?.employeeName} rejected!`);
    setRejectionReason("");
  };

  // Apply filters
  const filteredLeaveRequests = MOCK_LEAVE_REQUESTS.filter(leave => {
    const matchesSearch = 
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "All" || leave.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || leave.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Leave Management</h2>
        <p className="text-muted-foreground">
          Review and process employee leave requests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>Pending Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {MOCK_LEAVE_REQUESTS.filter(leave => leave.status === "Pending").length}
            </div>
            <p className="text-sm text-muted-foreground">
              Requests awaiting your review
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Today's Absences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">
              Employees on leave today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>This Month</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">
              Leave requests in April
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              <CalendarCheck className="mr-2" />
              <span>Leave Requests</span>
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 sm:max-w-[250px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredLeaveRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No leave requests found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="py-3 px-4 text-left font-medium">Employee</th>
                    <th className="py-3 px-4 text-left font-medium">Leave Type</th>
                    <th className="py-3 px-4 text-left font-medium">Duration</th>
                    <th className="py-3 px-4 text-left font-medium">Applied On</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaveRequests.map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{leave.employeeName}</p>
                          <p className="text-xs text-muted-foreground">{leave.department}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{leave.leaveType}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p>{formatDate(leave.startDate)} {leave.startDate !== leave.endDate && `- ${formatDate(leave.endDate)}`}</p>
                          <p className="text-xs text-muted-foreground">{leave.totalDays} day{leave.totalDays > 1 ? 's' : ''}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{formatDate(leave.appliedOn)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          leave.status === "Approved" 
                            ? "bg-green-100 text-green-800" 
                            : leave.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedLeave(leave)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Leave Request Details</DialogTitle>
                            </DialogHeader>
                            
                            {selectedLeave && (
                              <div className="space-y-6 py-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-xl font-bold">{selectedLeave.employeeName}</h3>
                                      <p className="text-muted-foreground">{selectedLeave.position} - {selectedLeave.department}</p>
                                      <p className="text-xs text-muted-foreground mt-1">Employee ID: {selectedLeave.employeeId}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Leave Type</p>
                                      <p className="font-medium">{selectedLeave.leaveType}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Duration</p>
                                      <p>{formatDate(selectedLeave.startDate)} {selectedLeave.startDate !== selectedLeave.endDate && ` - ${formatDate(selectedLeave.endDate)}`}</p>
                                      <p className="text-sm">{selectedLeave.totalDays} day{selectedLeave.totalDays > 1 ? 's' : ''}</p>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Reason</p>
                                      <p>{selectedLeave.reason}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        selectedLeave.status === "Approved" 
                                          ? "bg-green-100 text-green-800" 
                                          : selectedLeave.status === "Rejected"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-orange-100 text-orange-800"
                                      }`}>
                                        {selectedLeave.status}
                                      </span>
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm font-medium text-muted-foreground">Applied On</p>
                                      <p>{formatDate(selectedLeave.appliedOn)}</p>
                                    </div>
                                    
                                    {selectedLeave.status === "Approved" && selectedLeave.approvedOn && (
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Approved On</p>
                                        <p>{formatDate(selectedLeave.approvedOn)}</p>
                                        {selectedLeave.approvedBy && (
                                          <p className="text-xs text-muted-foreground">by {selectedLeave.approvedBy}</p>
                                        )}
                                      </div>
                                    )}
                                    
                                    {selectedLeave.status === "Rejected" && selectedLeave.rejectedOn && (
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Rejected On</p>
                                        <p>{formatDate(selectedLeave.rejectedOn)}</p>
                                        {selectedLeave.rejectedBy && (
                                          <p className="text-xs text-muted-foreground">by {selectedLeave.rejectedBy}</p>
                                        )}
                                      </div>
                                    )}
                                    
                                    {selectedLeave.status === "Rejected" && selectedLeave.rejectionReason && (
                                      <div>
                                        <p className="text-sm font-medium text-muted-foreground">Rejection Reason</p>
                                        <p>{selectedLeave.rejectionReason}</p>
                                      </div>
                                    )}
                                    
                                    {selectedLeave.status === "Pending" && (
                                      <div className="pt-4">
                                        <p className="text-sm font-medium mb-2">Add a comment (optional)</p>
                                        <Textarea 
                                          placeholder="Add any notes regarding this leave request..."
                                          className="mb-4"
                                          rows={3}
                                        />
                                        
                                        <div className="flex gap-3">
                                          <Button 
                                            onClick={handleApprove}
                                            className="flex-1 flex items-center justify-center gap-2"
                                          >
                                            <CalendarCheck className="h-4 w-4" />
                                            <span>Approve</span>
                                          </Button>
                                          
                                          <Dialog>
                                            <DialogTrigger asChild>
                                              <Button 
                                                variant="outline"
                                                className="flex-1 flex items-center justify-center gap-2"
                                              >
                                                <CalendarMinus className="h-4 w-4" />
                                                <span>Reject</span>
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                              <DialogHeader>
                                                <DialogTitle>Reject Leave Request</DialogTitle>
                                                <DialogDescription>
                                                  Please provide a reason for rejecting this leave request.
                                                </DialogDescription>
                                              </DialogHeader>
                                              <div className="py-4">
                                                <Textarea 
                                                  placeholder="Enter reason for rejection..."
                                                  value={rejectionReason}
                                                  onChange={(e) => setRejectionReason(e.target.value)}
                                                  rows={4}
                                                />
                                              </div>
                                              <DialogFooter>
                                                <DialogClose asChild>
                                                  <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button 
                                                  variant="destructive" 
                                                  onClick={handleReject}
                                                >
                                                  Reject Request
                                                </Button>
                                              </DialogFooter>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagement;
