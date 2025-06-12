import { Check } from "lucide-react";
import { getAllSessions } from "@/lib/session-data";

interface SidebarProps {
  currentSession: number;
  onSessionSelect: (sessionId: number) => void;
  completedSessions: number[];
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ 
  currentSession, 
  onSessionSelect, 
  completedSessions,
  isMobile = false,
  isOpen = false,
  onClose
}: SidebarProps) {
  const sessions = getAllSessions();
  const completedCount = completedSessions.length;
  const progressPercentage = (completedCount / sessions.length) * 100;

  const handleSessionClick = (sessionId: number) => {
    onSessionSelect(sessionId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="p-6">
      {/* Logo and Brand */}
      <div className="flex items-center mb-8">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
          alt="Keploy Logo" 
          className="w-12 h-12 mr-3"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Keploy Fellowship</h1>
          <p className="text-sm text-gray-600">API Testing Program</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-8 p-4 bg-gray-50 rounded-xl">
        <h3 className="font-semibold text-gray-800 mb-3">Your Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Completed</span>
            <span className="text-sm font-semibold text-green-600">
              {completedCount}/{sessions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Session Navigation */}
      <nav className="space-y-2">
        <h3 className="font-semibold text-gray-800 mb-4">Sessions</h3>
        
        {sessions.map((session) => {
          const isActive = currentSession === session.id;
          const isCompleted = completedSessions.includes(session.id);
          
          return (
            <div
              key={session.id}
              onClick={() => handleSessionClick(session.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? 'gradient-orange text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    Session {session.id}
                  </h4>
                  <p className={`text-sm ${isActive ? 'opacity-90' : 'text-gray-600'}`}>
                    {session.title}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-white/20 text-white'
                    : isActive
                    ? 'bg-white/20'
                    : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span className={`text-xs font-medium ${
                      isActive ? 'text-white' : 'text-gray-600'
                    }`}>
                      {session.id}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          >
            <div 
              className={`fixed left-0 top-0 h-full w-80 bg-white transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden lg:block w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200">
      {sidebarContent}
    </div>
  );
}
