import { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { TaskManagement } from "./components/TaskManagement.jsx";

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'work-queue':
        return <TaskManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="container mx-auto max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
}