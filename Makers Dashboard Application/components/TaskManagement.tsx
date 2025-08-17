import { useState } from "react";
import { Grid, List, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface Task {
  id: string;
  applicationId: string;
  applicantName: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  status: 'new' | 'in-progress' | 'review' | 'completed';
  assignedTo?: string;
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: "TSK001",
    applicationId: "APP001",
    applicantName: "John Smith",
    type: "Credit Application",
    priority: 'high',
    status: 'new',
    dueDate: "2024-08-18"
  },
  {
    id: "TSK002",
    applicationId: "APP002",
    applicantName: "Sarah Johnson",
    type: "Loan Application",
    priority: 'medium',
    status: 'in-progress',
    assignedTo: "John Doe",
    dueDate: "2024-08-19"
  },
  {
    id: "TSK003",
    applicationId: "APP003",
    applicantName: "Michael Brown",
    type: "Account Opening",
    priority: 'low',
    status: 'new',
    dueDate: "2024-08-20"
  }
];

export function TaskManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [tasks, setTasks] = useState(mockTasks);

  const handleStartReview = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'in-progress' as const, assignedTo: 'John Doe' }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="text-lg text-gray-900">Hello, John Doe</h3>
                <p className="text-sm text-gray-600">Application Reviewer</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
                Grid
              </Button>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-lg text-blue-600 mb-4">Work Queue: New Applications</h4>
            
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                    viewMode === 'list' ? 'flex items-center justify-between' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'flex-1' : 'space-y-3'}>
                    <div className={viewMode === 'list' ? 'flex items-center space-x-4' : 'space-y-2'}>
                      <div>
                        <div className="text-sm text-blue-600">{task.applicationId}</div>
                        <div className="text-sm text-gray-900">{task.applicantName}</div>
                        <div className="text-xs text-gray-600">{task.type}</div>
                      </div>
                      
                      {viewMode === 'grid' && (
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    )}
                    
                    {task.assignedTo && (
                      <div className="text-xs text-gray-600">
                        Assigned to: {task.assignedTo}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Due: {task.dueDate}
                    </div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'ml-4' : 'mt-3'}>
                    {task.status === 'new' ? (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleStartReview(task.id)}
                      >
                        Start Review
                      </Button>
                    ) : task.status === 'in-progress' ? (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark IPL
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-500">
                        {task.status}
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