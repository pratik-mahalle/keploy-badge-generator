import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { getSessionById } from "@/lib/session-data";

interface BadgeGeneratorProps {
  currentSession: number;
  onBadgeGenerated: (sessionId: number) => void;
}

export default function BadgeGenerator({ currentSession, onBadgeGenerated }: BadgeGeneratorProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [badgeData, setBadgeData] = useState<{
    name: string;
    sessionTitle: string;
    date: string;
  } | null>(null);

  const session = getSessionById(currentSession);

  const validateMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; sessionId: number }) => {
      const response = await apiRequest("POST", "/api/validate-participant", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.authorized) {
        const currentDate = new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
        
        setBadgeData({
          name,
          sessionTitle: data.sessionTitle,
          date: currentDate
        });
        setShowBadge(true);
        onBadgeGenerated(currentSession);
        
        // Smooth scroll to badge
        setTimeout(() => {
          const badgeElement = document.getElementById('generated-badge');
          if (badgeElement) {
            badgeElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'center'
            });
          }
        }, 100);
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      return;
    }

    validateMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      sessionId: currentSession
    });
  };

  const downloadBadge = () => {
    const badgeElement = document.getElementById('badge-display');
    if (!badgeElement) return;

    // Dynamically import html2canvas to avoid SSR issues
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(badgeElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 280,
        height: 280
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Keploy_${session?.title.replace(/\s+/g, '_')}_Badge.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white rounded-2xl container-shadow">
        <CardContent className="p-8">
          {/* Logo and Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                alt="Keploy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Generate your Keploy API Fellowship Badge
            </h1>
            <p className="text-gray-600">
              Session: {session?.title || 'Unknown Session'}
            </p>
          </div>

          {/* Badge Generation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="sr-only">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[var(--keploy-orange)] transition-colors duration-200"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[var(--keploy-orange)] transition-colors duration-200"
                required
              />
            </div>

            {/* Error Message */}
            {validateMutation.isError && (
              <div className="text-red-500 text-sm min-h-[20px]">
                {validateMutation.error instanceof Error 
                  ? validateMutation.error.message 
                  : 'An error occurred. Please try again.'}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={validateMutation.isPending}
              className="w-full py-3 gradient-orange text-white font-medium rounded-xl hover:opacity-90 transition-opacity duration-200 mt-6"
            >
              {validateMutation.isPending ? 'Validating...' : 'Generate Badge'}
            </Button>
          </form>

          {/* Generated Badge Display */}
          {showBadge && badgeData && (
            <div id="generated-badge" className="mt-8">
              <div 
                id="badge-display"
                className="w-72 h-72 mx-auto bg-white rounded-full flex flex-col items-center justify-center text-center badge-shadow"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                  alt="Keploy Logo" 
                  className="w-10 h-10 mb-2"
                />
                <h2 className="text-lg font-bold gradient-text-orange mb-1">
                  {badgeData.sessionTitle}
                </h2>
                <p className="text-gray-800 font-medium mb-1">
                  {badgeData.name}
                </p>
                <p className="text-gray-600 text-sm mb-1">Session Completed</p>
                <p className="text-gray-600 text-sm">{badgeData.date}</p>
              </div>

              <div className="text-center mt-6">
                <Button 
                  onClick={downloadBadge}
                  className="px-6 py-3 gradient-green text-white font-medium rounded-xl hover:opacity-90 transition-opacity duration-200"
                >
                  Download Badge
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Information Card */}
      <Card className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl container-shadow">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Session Requirements</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Complete session exercises
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Submit assignment work
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-green-500 mr-2" />
              Use registered email address
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
