'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import html2canvas from 'html2canvas'
import Link from 'next/link'
import { validEmails } from '@/lib/valid-emails'
import { toast } from '@/components/ui/use-toast'

export function BadgeGenerator() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [badgeData, setBadgeData] = useState<{
    name: string
    sessionTitle: string
    date: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check if email is valid
    if (!validEmails.includes(email.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "This email is not registered for the Keploy Fellowship program.",
      })
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setBadgeData({
      name,
      sessionTitle: "API Testing Basics",
      date: new Date().toLocaleDateString()
    })
    setShowBadge(true)
    setIsLoading(false)
  }

  const downloadBadge = () => {
    const badgeElement = document.getElementById('badge-display')
    if (!badgeElement) return

    html2canvas(badgeElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      width: 280,
      height: 280
    }).then(canvas => {
      const link = document.createElement('a')
      link.download = `Keploy_API_Testing_Basics_Badge.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-400 to-cyan-300">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="bg-white rounded-2xl container-shadow animate-float max-w-2xl mx-auto scale-105">
          <CardContent className="p-12">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="w-28 h-28 mx-auto mb-6 animate-bounce-slow">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                  alt="Keploy Logo" 
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4 animate-fade-in">
                Generate your Keploy API Fellowship Badge
              </h1>
              <p className="text-lg text-gray-600 animate-fade-in-delay">
                Session 1: API Testing Basics
              </p>
            </div>

            {/* Form */}
            {!showBadge && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-500 transform hover:scale-105 ${
                    isLoading 
                      ? 'bg-gray-400' 
                      : 'gradient-orange hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    'Generate Badge'
                  )}
                </Button>
              </form>
            )}

            {/* Generated Badge Display */}
            {showBadge && badgeData && (
              <div id="generated-badge" className="mt-12 animate-zoom-in">
                <div 
                  id="badge-display"
                  className="w-96 h-96 mx-auto bg-white rounded-full flex flex-col items-center justify-center text-center badge-shadow animate-rotate-3d"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/Keploy_Logo.png" 
                    alt="Keploy Logo" 
                    className="w-24 h-24 mb-4 animate-pulse drop-shadow-lg"
                  />
                  <h2 className="text-2xl font-bold gradient-text-orange mb-2">
                    {badgeData.sessionTitle}
                  </h2>
                  <p className="text-xl text-gray-800 font-medium mb-2">
                    {badgeData.name}
                  </p>
                  <p className="text-gray-600 text-lg mb-2">Session Completed</p>
                  <p className="text-gray-600 text-lg">{badgeData.date}</p>
                </div>

                <div className="text-center mt-8">
                  <Button 
                    onClick={downloadBadge}
                    className="px-8 py-4 gradient-green text-white text-lg font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Download Badge
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 