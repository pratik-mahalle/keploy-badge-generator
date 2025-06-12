import { useState } from "react";
import Sidebar from "@/components/sidebar";
import BadgeGenerator from "@/components/badge-generator";
import MobileHeader from "@/components/mobile-header";

export default function Home() {
  const [currentSession, setCurrentSession] = useState(1);
  const [completedSessions, setCompletedSessions] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSessionSelect = (sessionId: number) => {
    setCurrentSession(sessionId);
  };

  const handleBadgeGenerated = (sessionId: number) => {
    if (!completedSessions.includes(sessionId)) {
      setCompletedSessions(prev => [...prev, sessionId]);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="gradient-bg min-h-screen">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <Sidebar
          currentSession={currentSession}
          onSessionSelect={handleSessionSelect}
          completedSessions={completedSessions}
        />

        {/* Mobile Sidebar */}
        <Sidebar
          currentSession={currentSession}
          onSessionSelect={handleSessionSelect}
          completedSessions={completedSessions}
          isMobile
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Mobile Header */}
          <MobileHeader
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />

          {/* Badge Generator */}
          <BadgeGenerator
            currentSession={currentSession}
            onBadgeGenerated={handleBadgeGenerated}
          />
        </div>
      </div>
    </div>
  );
}
