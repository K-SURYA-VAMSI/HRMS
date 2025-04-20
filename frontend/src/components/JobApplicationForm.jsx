import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Human Resources",
  "Finance",
  "Operations",
  "Customer Support",
];

const positions = {
  Engineering: ["Software Engineer", "DevOps Engineer", "QA Engineer"],
  Marketing: ["Marketing Manager", "Content Writer", "Digital Marketing Specialist"],
  Sales: ["Sales Representative", "Account Manager", "Sales Manager"],
  "Human Resources": ["HR Coordinator", "Recruiter", "HR Manager"],
  Finance: ["Accountant", "Financial Analyst", "Finance Manager"],
  Operations: ["Operations Manager", "Project Manager", "Business Analyst"],
  "Customer Support": ["Support Representative", "Support Manager", "Technical Support"],
};

const JobApplicationForm = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    position: "",
    experience: "",
    skills: "",
    education: {
      degree: "",
      institution: "",
      graduationYear: "",
    },
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDepartmentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      department: value,
      position: "", // Reset position when department changes
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "education") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === "skills") {
          formDataToSend.append(key, formData[key].split(",").map(s => s.trim()));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // TODO: Add API call to submit application
      // const response = await jobAPI.submitApplication(formDataToSend);
      
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Job Application</CardTitle>
        <CardDescription>
          Submit your application to join our team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={formData.department}
                onValueChange={handleDepartmentChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Position</Label>
              <Select
                value={formData.position}
                onValueChange={(value) =>
                  handleChange({ target: { name: "position", value } })
                }
                disabled={!formData.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {formData.department &&
                    positions[formData.department].map((pos) => (
                      <SelectItem key={pos} value={pos}>
                        {pos}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Years of Experience</Label>
            <Input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              step="0.5"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Skills (comma-separated)</Label>
            <Textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Node.js"
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Education</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  name="education.degree"
                  value={formData.education.degree}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input
                  name="education.institution"
                  value={formData.education.institution}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Graduation Year</Label>
              <Input
                type="number"
                name="education.graduationYear"
                value={formData.education.graduationYear}
                onChange={handleChange}
                min="1950"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Resume</Label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
            <p className="text-xs text-gray-500">
              Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplicationForm; 