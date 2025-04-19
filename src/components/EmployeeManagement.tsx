
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  MapPin, 
  Calendar,
  PenSquare,
  Trash2
} from "lucide-react";
import { toast } from "sonner";

// Mock data for employees
const MOCK_EMPLOYEES = [
  { 
    id: "1", 
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-123-4567",
    position: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    joinDate: "2022-05-15",
    status: "Active",
    manager: "Sarah Johnson",
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  { 
    id: "2", 
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "555-987-6543",
    position: "UX Designer",
    department: "Design",
    location: "New York, NY",
    joinDate: "2023-02-10",
    status: "Active",
    manager: "David Lee",
    imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  { 
    id: "3", 
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "555-456-7890",
    position: "Full Stack Developer",
    department: "Engineering",
    location: "Austin, TX",
    joinDate: "2021-11-05",
    status: "Active",
    manager: "Sarah Johnson",
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  { 
    id: "4", 
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "555-789-0123",
    position: "Product Manager",
    department: "Product",
    location: "Chicago, IL",
    joinDate: "2022-08-22",
    status: "Active",
    manager: "Michael Brown",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  { 
    id: "5", 
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "555-321-6547",
    position: "DevOps Engineer",
    department: "Infrastructure",
    location: "Seattle, WA",
    joinDate: "2023-01-15",
    status: "Active",
    manager: "David Lee",
    imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  { 
    id: "6", 
    name: "Amanda Martinez",
    email: "amanda.martinez@example.com",
    phone: "555-852-9631",
    position: "Marketing Specialist",
    department: "Marketing",
    location: "Los Angeles, CA",
    joinDate: "2022-03-10",
    status: "On Leave",
    manager: "Jennifer Taylor",
    imageUrl: "https://randomuser.me/api/portraits/women/6.jpg"
  },
];

// Mock data for departments
const DEPARTMENTS = ["Engineering", "Design", "Product", "Marketing", "Infrastructure", "Finance", "HR", "Sales"];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");
  
  const handleEditSave = () => {
    toast.success("Employee information updated successfully!");
    setViewMode("view");
  };
  
  const handleDelete = () => {
    toast.success("Employee removed successfully!");
  };
  
  const handleAddEmployee = () => {
    toast.success("New employee added successfully!");
  };

  // Apply filters
  const filteredEmployees = MOCK_EMPLOYEES.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "all" || employee.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Employee Management</h2>
        <p className="text-muted-foreground">
          View and manage employee information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              <Users className="mr-2" />
              <span>All Employees ({filteredEmployees.length})</span>
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="flex-1 sm:max-w-[300px]">
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
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Employee</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input placeholder="Enter full name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="Enter email address" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input placeholder="Enter phone number" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <Input placeholder="Enter job position" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Department</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {DEPARTMENTS.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input placeholder="Enter location" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Join Date</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Manager</label>
                        <Input placeholder="Enter manager's name" />
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddEmployee}>Add Employee</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No employees found matching your search criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="py-3 px-4 text-left font-medium">Employee</th>
                    <th className="py-3 px-4 text-left font-medium">Position</th>
                    <th className="py-3 px-4 text-left font-medium">Department</th>
                    <th className="py-3 px-4 text-left font-medium">Location</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-muted overflow-hidden mr-3">
                            <img 
                              src={employee.imageUrl} 
                              alt={employee.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-xs text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{employee.position}</td>
                      <td className="py-3 px-4">{employee.department}</td>
                      <td className="py-3 px-4">{employee.location}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          employee.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedEmployee(employee);
                                setViewMode("view");
                              }}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Employee Details</DialogTitle>
                            </DialogHeader>
                            
                            {selectedEmployee && (
                              <div className="py-4">
                                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "view" | "edit")}>
                                  <TabsList className="mb-4">
                                    <TabsTrigger value="view" className="flex items-center gap-2">
                                      <User size={16} />
                                      <span>View</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="edit" className="flex items-center gap-2">
                                      <PenSquare size={16} />
                                      <span>Edit</span>
                                    </TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="view">
                                    <div className="flex flex-col md:flex-row gap-6">
                                      <div className="md:w-1/3 flex flex-col items-center">
                                        <div className="h-32 w-32 rounded-full bg-muted overflow-hidden mb-4">
                                          <img 
                                            src={selectedEmployee.imageUrl} 
                                            alt={selectedEmployee.name} 
                                            className="h-full w-full object-cover"
                                          />
                                        </div>
                                        <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
                                        <p className="text-muted-foreground">{selectedEmployee.position}</p>
                                        
                                        <div className="mt-4 space-y-2 w-full">
                                          <div className="flex items-center">
                                            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{selectedEmployee.email}</span>
                                          </div>
                                          <div className="flex items-center">
                                            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{selectedEmployee.phone}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="md:w-2/3 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm font-medium text-muted-foreground">Department</p>
                                            <div className="flex items-center mt-1">
                                              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                                              <p>{selectedEmployee.department}</p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                                            <div className="flex items-center mt-1">
                                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                              <p>{selectedEmployee.location}</p>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                                            <div className="flex items-center mt-1">
                                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                              <p>{formatDate(selectedEmployee.joinDate)}</p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                                            <p className="mt-1">
                                              <span className={`px-2 py-1 rounded-full text-xs ${
                                                selectedEmployee.status === "Active" 
                                                  ? "bg-green-100 text-green-800" 
                                                  : "bg-orange-100 text-orange-800"
                                              }`}>
                                                {selectedEmployee.status}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <p className="text-sm font-medium text-muted-foreground">Manager</p>
                                          <p className="mt-1">{selectedEmployee.manager}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="edit">
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Full Name</label>
                                          <Input defaultValue={selectedEmployee.name} />
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Email</label>
                                          <Input type="email" defaultValue={selectedEmployee.email} />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Phone Number</label>
                                          <Input defaultValue={selectedEmployee.phone} />
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Position</label>
                                          <Input defaultValue={selectedEmployee.position} />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Department</label>
                                          <Select defaultValue={selectedEmployee.department}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {DEPARTMENTS.map((dept) => (
                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Location</label>
                                          <Input defaultValue={selectedEmployee.location} />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Join Date</label>
                                          <Input type="date" defaultValue={selectedEmployee.joinDate} />
                                        </div>
                                        <div className="space-y-2">
                                          <label className="text-sm font-medium">Status</label>
                                          <Select defaultValue={selectedEmployee.status}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Active">Active</SelectItem>
                                              <SelectItem value="On Leave">On Leave</SelectItem>
                                              <SelectItem value="Terminated">Terminated</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium">Manager</label>
                                        <Input defaultValue={selectedEmployee.manager} />
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}
                            
                            <DialogFooter className="gap-2">
                              <DialogClose asChild>
                                <Button variant="outline">Close</Button>
                              </DialogClose>
                              {viewMode === "view" ? (
                                <Button 
                                  variant="destructive"
                                  onClick={handleDelete}
                                  className="flex items-center gap-2"
                                >
                                  <Trash2 size={16} />
                                  <span>Remove Employee</span>
                                </Button>
                              ) : (
                                <Button onClick={handleEditSave}>Save Changes</Button>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeManagement;
