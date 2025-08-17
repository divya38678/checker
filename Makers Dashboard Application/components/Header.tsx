import { Search, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Header({ activeSection, onSectionChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className={`${activeSection === 'dashboard' ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => onSectionChange('dashboard')}
            >
              DASHBOARD
            </Button>
            <Button 
              variant="ghost" 
              className={`${activeSection === 'work-queue' ? 'text-gray-900' : 'text-gray-600'} hover:text-gray-900 hover:bg-gray-100`}
              onClick={() => onSectionChange('work-queue')}
            >
              WORK QUEUE
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              HELP
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              NOTIFICATIONS
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Maker
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}