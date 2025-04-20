
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CalendarCheck, CalendarX, Clock } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// Mock data for leave history
const MOCK_LEAVE_REQUESTS = [
  { 
    id: "1", 
    type: "Annual Leave", 
    startDate: "2025-05-10", 
    endDate: "2025-05-12", 
    reason: "Family vacation", 
    status: "Pending",
    appliedOn: "2025-04-15" 
  },
  { 
    id: "2", 
    type: "Sick Leave", 
    startDate: "2025-04-05", 
    endDate: "2025-04-05", 
    reason: "Not feeling well", 
    status: "Approved",
    appliedOn: "2025-04-01",
    approvedOn: "2025-04-02" 
  },
  { 
    id: "3", 
    type: "Personal Leave", 
    startDate: "2025-03-20", 
    endDate: "2025-03-20", 
    reason: "DMV appointment", 
    status: "Approved",
    appliedOn: "2025-03-15",
    approvedOn: "2025-03-16" 
  },
  { 
    id: "4", 
    type: "Annual Leave", 
    startDate: "2025-02-15", 
    endDate: "2025-02-18", 
    reason: "Weekend trip", 
    status: "Rejected",
    appliedOn: "2025-02-01",
    rejectedOn: "2025-02-03",
    rejectionReason: "High workload during that period" 
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

const LeaveRequests = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [selectedLeave, setSelectedLeave] = useState<typeof MOCK_LEAVE_REQUESTS[0] | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error("Please fill all required fields");
      return;
    }

    // Simulate saving the leave request
    toast.success("Leave request submitted successfully!");
    
    // Reset form
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const viewLeaveDetails = (leave: typeof MOCK_LEAVE_REQUESTS[0]) => {
    setSelectedLeave(leave);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Leave Requests</h2>
        <p className="text-muted-foreground">
          Apply for leave and track your leave requests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              <span>Apply for Leave</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="leaveType" className="text-sm font-medium">
                    Leave Type
                  </label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="endDate" className="text-sm font-medium">
                      End Date
                    </label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="reason" className="text-sm font-medium">
                    Reason
                  </label>
                  <Textarea
                    id="reason"
                    placeholder="Enter reason for leave"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full mt-6">
                Submit Leave Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Annual Leave</div>
                  <div className="text-2xl font-bold mt-1">15 days</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Expires Dec 31, 2025
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Sick Leave</div>
                  <div className="text-2xl font-bold mt-1">7 days</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Resets every quarter
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Personal Leave</div>
                  <div className="text-2xl font-bold mt-1">3 days</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Available anytime
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Unpaid Leave</div>
                  <div className="text-2xl font-bold mt-1">Unlimited</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Subject to approval
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-3 text-left font-medium">Type</th>
                  <th className="py-2 px-3 text-left font-medium">Dates</th>
                  <th className="py-2 px-3 text-left font-medium">Reason</th>
                  <th className="py-2 px-3 text-left font-medium">Status</th>
                  <th className="py-2 px-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEAVE_REQUESTS.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-3">{leave.type}</td>
                    <td className="py-3 px-3">
                      {formatDate(leave.startDate)} 
                      {leave.startDate !== leave.endDate && ` to ${formatDate(leave.endDate)}`}
                    </td>
                    <td className="py-3 px-3 max-w-[200px] truncate">{leave.reason}</td>
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => viewLeaveDetails(leave)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Leave Request Details</DialogTitle>
                          </DialogHeader>
                          {selectedLeave && (
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                                  <p className="font-medium">{selectedLeave.type}</p>
                                </div>
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
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Dates</p>
                                <p className="font-medium">
                                  {formatDate(selectedLeave.startDate)} 
                                  {selectedLeave.startDate !== selectedLeave.endDate && 
                                    ` to ${formatDate(selectedLeave.endDate)}`}
                                </p>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Reason</p>
                                <p>{selectedLeave.reason}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Applied On</p>
                                <p>{formatDate(selectedLeave.appliedOn)}</p>
                              </div>
                              
                              {selectedLeave.status === "Approved" && selectedLeave.approvedOn && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Approved On</p>
                                  <p>{formatDate(selectedLeave.approvedOn)}</p>
                                </div>
                              )}
                              
                              {selectedLeave.status === "Rejected" && selectedLeave.rejectionReason && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Rejection Reason</p>
                                  <p>{selectedLeave.rejectionReason}</p>
                                </div>
                              )}
                            </div>
                          )}
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                            {selectedLeave?.status === "Pending" && (
                              <Button variant="destructive">Cancel Request</Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequests;
