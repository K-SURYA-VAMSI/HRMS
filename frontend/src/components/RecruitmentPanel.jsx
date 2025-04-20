import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  UserPlus, 
  Search, 
  Briefcase,
  User,
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Mock job applications data
const MOCK_APPLICATIONS = [
  { 
    id: "1", 
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "555-789-4561",
    position: "Senior Frontend Developer",
    department: "Engineering",
    applyDate: "2025-04-15",
    experience: "7 years",
    status: "New",
    resumeUrl: "#",
    coverLetter: "I am writing to express my interest in the Senior Frontend Developer position. With over 7 years of experience in web development, I have a strong background in React, TypeScript, and building responsive user interfaces...",
    skills: ["React", "TypeScript", "Redux", "CSS", "Node.js"]
  },
  { 
    id: "2", 
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "555-456-7832",
    position: "UX Designer",
    department: "Design",
    applyDate: "2025-04-12",
    experience: "5 years",
    status: "Interview",
    interviewDate: "2025-04-25",
    resumeUrl: "#",
    coverLetter: "I'm excited to apply for the UX Designer position. With 5 years of experience in user research, wireframing, and prototyping, I've worked on projects spanning from e-commerce platforms to mobile applications...",
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "UI Design"]
  },
  { 
    id: "3", 
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    phone: "555-369-8521",
    position: "Product Manager",
    department: "Product",
    applyDate: "2025-04-10",
    experience: "6 years",
    status: "Interview",
    interviewDate: "2025-04-22",
    resumeUrl: "#",
    coverLetter: "I am applying for the Product Manager position at your company. With 6 years of experience in product management across different industries, I have successfully launched multiple products and led cross-functional teams...",
    skills: ["Product Strategy", "User Stories", "Agile", "Market Research", "Roadmapping"]
  },
  { 
    id: "4", 
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "555-852-7413",
    position: "DevOps Engineer",
    department: "Infrastructure",
    applyDate: "2025-04-08",
    experience: "4 years",
    status: "New",
    resumeUrl: "#",
    coverLetter: "I am interested in the DevOps Engineer position. With 4 years of experience in infrastructure automation, CI/CD pipeline implementation, and cloud platforms, I have helped organizations improve their deployment processes and system reliability...",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
  },
  { 
    id: "5", 
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "555-741-9632",
    position: "Marketing Specialist",
    department: "Marketing",
    applyDate: "2025-04-05",
    experience: "3 years",
    status: "Rejected",
    rejectionReason: "Selected another candidate with more relevant industry experience",
    resumeUrl: "#",
    coverLetter: "I am writing to apply for the Marketing Specialist position. With 3 years of experience in digital marketing and content creation, I have developed successful marketing campaigns and improved brand visibility for multiple companies...",
    skills: ["Content Marketing", "Social Media", "SEO", "Analytics", "Email Marketing"]
  },
];

// Mock job postings data
const MOCK_JOB_POSTINGS = [
  { 
    id: "1", 
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    postedDate: "2025-04-10",
    deadline: "2025-05-15",
    applicants: 3,
    status: "Open"
  },
  { 
    id: "2", 
    title: "Product Manager",
    department: "Product",
    location: "New York, NY (Remote)",
    type: "Full-time",
    postedDate: "2025-04-05",
    deadline: "2025-05-05",
    applicants: 5,
    status: "Open"
  },
  { 
    id: "3", 
    title: "UX Designer",
    department: "Design",
    location: "Chicago, IL (On-site)",
    type: "Full-time",
    postedDate: "2025-04-12",
    deadline: "2025-05-12",
    applicants: 4,
    status: "Open"
  },
  { 
    id: "4", 
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    postedDate: "2025-04-15",
    deadline: "2025-05-15",
    applicants: 2,
    status: "Open"
  },
];

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Mock departments
const DEPARTMENTS = ["Engineering", "Design", "Product", "Marketing", "Infrastructure", "Finance", "HR", "Sales"];

const RecruitmentPanel = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleAccept = () => {
    toast.success("Candidate accepted! Offer letter will be sent.");
  };

  const handleReject = () => {
    toast.success("Candidate rejected. Notification email will be sent.");
  };

  const handleScheduleInterview = () => {
    toast.success("Interview scheduled successfully!");
  };

  const handleAddJobPosting = () => {
    toast.success("New job posting created successfully!");
  };

  // Apply filters to applications
  const filteredApplications = MOCK_APPLICATIONS.filter(application => {
    const matchesSearch = 
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || application.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Recruitment Panel</h2>
        <p className="text-muted-foreground">
          Manage job applications and postings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Recruitment Dashboard</CardTitle>
            {activeTab === "jobPostings" && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Add Job Posting</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Create New Job Posting</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Title</label>
                      <Input placeholder="Enter job title" />
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
                        <Input placeholder="Enter job location" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Description</label>
                      <Textarea placeholder="Enter job description" className="min-h-[200px]" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Requirements</label>
                      <Textarea placeholder="Enter job requirements" className="min-h-[100px]" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Application Deadline</label>
                        <Input type="date" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Employment Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddJobPosting}>Create Posting</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="jobPostings">Job Postings</TabsTrigger>
            </TabsList>

            <TabsContent value="applications" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium">
                  <div className="col-span-3">Candidate</div>
                  <div className="col-span-2">Position</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Applied</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-3">
                        <div className="font-medium">{application.name}</div>
                        <div className="text-sm text-muted-foreground">{application.email}</div>
                      </div>
                      <div className="col-span-2">{application.position}</div>
                      <div className="col-span-2">{application.department}</div>
                      <div className="col-span-2">{formatDate(application.applyDate)}</div>
                      <div className="col-span-2">
                        <Badge
                          variant={
                            application.status === "New"
                              ? "default"
                              : application.status === "Interview"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Personal Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4 text-muted-foreground" />
                                      <span>{application.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span>{application.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span>{application.phone}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Application Details</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                                      <span>{application.position}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-muted-foreground" />
                                      <span>{application.department}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">Experience:</span>
                                      <span>{application.experience}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {application.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Cover Letter</h4>
                                <p className="text-sm text-muted-foreground">
                                  {application.coverLetter}
                                </p>
                              </div>

                              {application.status === "Interview" && (
                                <div>
                                  <h4 className="font-medium mb-2">Interview Details</h4>
                                  <p className="text-sm">
                                    Scheduled for: {formatDate(application.interviewDate)}
                                  </p>
                                </div>
                              )}

                              {application.status === "Rejected" && (
                                <div>
                                  <h4 className="font-medium mb-2">Rejection Reason</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {application.rejectionReason}
                                  </p>
                                </div>
                              )}
                            </div>

                            <DialogFooter>
                              {application.status === "New" && (
                                <>
                                  <Button
                                    variant="outline"
                                    onClick={handleScheduleInterview}
                                  >
                                    Schedule Interview
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                  >
                                    Reject
                                  </Button>
                                  <Button onClick={handleAccept}>Accept</Button>
                                </>
                              )}
                              {application.status === "Interview" && (
                                <>
                                  <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                  >
                                    Reject
                                  </Button>
                                  <Button onClick={handleAccept}>Accept</Button>
                                </>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jobPostings" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium">
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Department</div>
                  <div className="col-span-2">Location</div>
                  <div className="col-span-2">Posted</div>
                  <div className="col-span-2">Deadline</div>
                  <div className="col-span-1">Status</div>
                </div>
                <div className="divide-y">
                  {MOCK_JOB_POSTINGS.map((posting) => (
                    <div key={posting.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-3">
                        <div className="font-medium">{posting.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {posting.type}
                        </div>
                      </div>
                      <div className="col-span-2">{posting.department}</div>
                      <div className="col-span-2">{posting.location}</div>
                      <div className="col-span-2">{formatDate(posting.postedDate)}</div>
                      <div className="col-span-2">{formatDate(posting.deadline)}</div>
                      <div className="col-span-1">
                        <Badge variant={posting.status === "Open" ? "default" : "secondary"}>
                          {posting.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentPanel; 