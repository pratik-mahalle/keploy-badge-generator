import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function MobileHeader({ isMobileMenuOpen, toggleMobileMenu }: MobileHeaderProps) {
  return (
    <div className="lg:hidden mb-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 container-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
            alt="Keploy Logo" 
            className="w-10 h-10 mr-3"
          />
          <div>
            <h1 className="text-lg font-bold text-gray-800">Keploy Fellowship</h1>
            <p className="text-sm text-gray-600">API Testing Program</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </Button>
      </div>
    </div>
  );
}
