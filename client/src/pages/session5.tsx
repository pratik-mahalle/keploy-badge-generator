import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export default function Session5() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showBadge, setShowBadge] = useState(false);
  const [badgeData, setBadgeData] = useState<{
    name: string;
    sessionTitle: string;
    date: string;
  } | null>(null);

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
      sessionId: 5
    });
  };

  const downloadBadge = () => {
    const badgeElement = document.getElementById('badge-display');
    if (!badgeElement) return;

    import('html2canvas').then((html2canvas) => {
      html2canvas.default(badgeElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 280,
        height: 280
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Keploy_Advanced_Testing_Badge.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    });
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        {/* Navigation Links */}
        <div className="mb-6 text-center">
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/" className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">Session 1</Link>
            <Link href="/session-2" className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">Session 2</Link>
            <Link href="/session-3" className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">Session 3</Link>
            <Link href="/session-4" className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">Session 4</Link>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">Session 5</span>
            <Link href="/session-6" className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors">Session 6</Link>
          </div>
        </div>

        <Card className="bg-white rounded-2xl container-shadow animate-float">
          <CardContent className="p-8">
            {/* Logo and Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 animate-bounce-slow">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                  alt="Keploy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-in">
                Generate your Keploy API Fellowship Badge
              </h1>
              <p className="text-gray-600 animate-fade-in-delay">
                Session 5: Advanced Testing
              </p>
            </div>

            {/* Badge Generation Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-slide-up">
                <Label htmlFor="name" className="sr-only">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[var(--keploy-orange)] transition-all duration-300 hover:shadow-md"
                  required
                />
              </div>
              
              <div className="animate-slide-up-delay">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:border-[var(--keploy-orange)] transition-all duration-300 hover:shadow-md"
                  required
                />
              </div>

              {/* Error Message */}
              {validateMutation.isError && (
                <div className="text-red-500 text-sm min-h-[20px] animate-shake">
                  {validateMutation.error instanceof Error 
                    ? validateMutation.error.message 
                    : 'An error occurred. Please try again.'}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={validateMutation.isPending}
                className="w-full py-3 gradient-orange text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 mt-6 transform hover:scale-105 hover:shadow-lg"
              >
                {validateMutation.isPending ? 'Validating...' : 'Generate Badge'}
              </Button>
            </form>

            {/* Generated Badge Display */}
            {showBadge && badgeData && (
              <div id="generated-badge" className="mt-8 animate-zoom-in">
                <div 
                  id="badge-display"
                  className="w-72 h-72 mx-auto bg-white rounded-full flex flex-col items-center justify-center text-center badge-shadow animate-rotate-3d"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                    alt="Keploy Logo" 
                    className="w-10 h-10 mb-2 animate-pulse"
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
                    className="px-6 py-3 gradient-green text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Download Badge
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Session Description */}
        <Card className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl container-shadow animate-slide-up-slow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Session 5: Advanced Testing</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore sophisticated testing techniques including load testing, security testing, 
              and advanced validation strategies for complex API scenarios.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                Load & Performance Testing
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                Security Testing Methods
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                Complex Validation Strategies
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}