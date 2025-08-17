import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Application {
  id: string;
  name: string;
  mailId: string;
  mobileNo: string;
  lastModified: string;
  status: 'pending' | 'in-review' | 'completed';
}

const mockApplications: Application[] = [
  {
    id: "APP001",
    name: "John Smith",
    mailId: "john.smith@email.com",
    mobileNo: "+1-555-0123",
    lastModified: "2024-08-17 14:30",
    status: 'pending'
  },
  {
    id: "APP002",
    name: "Sarah Johnson",
    mailId: "sarah.j@email.com",
    mobileNo: "+1-555-0456",
    lastModified: "2024-08-17 13:45",
    status: 'in-review'
  },
  {
    id: "APP003",
    name: "Michael Brown",
    mailId: "m.brown@email.com",
    mobileNo: "+1-555-0789",
    lastModified: "2024-08-17 12:15",
    status: 'pending'
  },
  {
    id: "APP004",
    name: "Emily Davis",
    mailId: "emily.davis@email.com",
    mobileNo: "+1-555-0321",
    lastModified: "2024-08-17 11:30",
    status: 'completed'
  },
  {
    id: "APP005",
    name: "David Wilson",
    mailId: "d.wilson@email.com",
    mobileNo: "+1-555-0654",
    lastModified: "2024-08-17 10:45",
    status: 'pending'
  }
];

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState(mockApplications);

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartReview = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'in-review' as const } : app
    ));
  };

  const handleMarkComplete = (appId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: 'completed' as const } : app
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-gray-900">MAKER DASHBOARD</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="SEARCH BY NAME"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-50"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="grid grid-cols-6 gap-4 p-4 bg-gray-100 border-b text-sm text-gray-600 uppercase tracking-wide">
              <div>APPLICATION ID</div>
              <div>NAME</div>
              <div>MAIL ID</div>
              <div>MOBILE NO</div>
              <div>LAST MODIFIED</div>
              <div>ACTIONS</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <div key={app.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50">
                  <div className="text-sm text-blue-600">{app.id}</div>
                  <div className="text-sm text-gray-900">{app.name}</div>
                  <div className="text-sm text-gray-600">{app.mailId}</div>
                  <div className="text-sm text-gray-600">{app.mobileNo}</div>
                  <div className="text-sm text-gray-600">{app.lastModified}</div>
                  <div className="flex space-x-2">
                    {app.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleStartReview(app.id)}
                      >
                        Start Review
                      </Button>
                    )}
                    {app.status === 'in-review' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleMarkComplete(app.id)}
                      >
                        Mark IPL
                      </Button>
                    )}
                    {app.status === 'completed' && (
                      <span className="text-sm text-green-600 px-2 py-1 bg-green-50 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}