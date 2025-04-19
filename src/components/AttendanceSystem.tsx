
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for attendance history
const MOCK_ATTENDANCE = [
  { date: "2025-04-18", checkIn: "09:05:23", checkOut: "18:10:45", status: "Present" },
  { date: "2025-04-17", checkIn: "08:55:12", checkOut: "17:45:38", status: "Present" },
  { date: "2025-04-16", checkIn: "09:12:05", checkOut: "18:30:22", status: "Present" },
  { date: "2025-04-15", checkIn: "09:08:55", checkOut: "18:05:17", status: "Present" },
  { date: "2025-04-14", checkIn: "", checkOut: "", status: "Absent" },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

const AttendanceSystem = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");

  const handleCheckIn = () => {
    const time = getCurrentTime();
    setCheckInTime(time);
    setCheckedIn(true);
    toast.success("Attendance marked successfully!");
  };

  const handleCheckOut = () => {
    const time = getCurrentTime();
    setCheckOutTime(time);
    setCheckedOut(true);
    toast.success("Check-out recorded successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Attendance System</h2>
        <p className="text-muted-foreground">
          Mark your daily attendance and view your attendance history.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" />
              <span>Today's Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-lg">
                  <Calendar className="mr-2" />
                  <span>{formatDate(getTodayDate())}</span>
                </div>
                {checkedIn && checkedOut && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="mr-1" size={18} />
                    <span>Completed</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Check In</p>
                  <div className="flex justify-between items-center">
                    {checkedIn ? (
                      <span className="text-lg font-bold">{checkInTime}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not checked in yet</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Check Out</p>
                  <div className="flex justify-between items-center">
                    {checkedOut ? (
                      <span className="text-lg font-bold">{checkOutTime}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not checked out yet</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={handleCheckIn} 
                  className="w-full" 
                  disabled={checkedIn}
                >
                  {checkedIn ? "Checked In" : "Check In"}
                </Button>
                <Button 
                  onClick={handleCheckOut} 
                  className="w-full" 
                  disabled={!checkedIn || checkedOut}
                  variant={checkedIn && !checkedOut ? "default" : "outline"}
                >
                  {checkedOut ? "Checked Out" : "Check Out"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>Working hours are from 9:00 AM to 6:00 PM</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>Lunch break is from 1:00 PM to 2:00 PM</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>Check-in grace period is 15 minutes</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>Three late arrivals count as one absent</span>
              </li>
              <li className="flex items-center">
                <div className="bg-primary text-primary-foreground p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <span>Remote work requires manager approval</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="py-2 px-3 text-left font-medium">Date</th>
                  <th className="py-2 px-3 text-left font-medium">Check In</th>
                  <th className="py-2 px-3 text-left font-medium">Check Out</th>
                  <th className="py-2 px-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ATTENDANCE.map((day, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-3">{formatDate(day.date)}</td>
                    <td className="py-3 px-3">{day.checkIn || "—"}</td>
                    <td className="py-3 px-3">{day.checkOut || "—"}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        day.status === "Present" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {day.status}
                      </span>
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

export default AttendanceSystem;
