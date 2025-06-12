import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { badgeGenerationSchema } from "@shared/schema";

const sessionData = {
  1: {
    title: "API Testing Basics",
    allowedEmails: ["participant1@keploy.io", "student1@example.com", "test@keploy.io"]
  },
  2: {
    title: "Mock Generation", 
    allowedEmails: ["participant2@keploy.io", "student2@example.com"]
  },
  3: {
    title: "Test Replay & Analysis",
    allowedEmails: ["participant3@keploy.io", "student3@example.com"]
  },
  4: {
    title: "CI/CD Integration",
    allowedEmails: ["participant4@keploy.io", "student4@example.com"]
  },
  5: {
    title: "Advanced Testing",
    allowedEmails: ["participant5@keploy.io", "student5@example.com"]
  },
  6: {
    title: "Final Project",
    allowedEmails: ["participant6@keploy.io", "student6@example.com"]
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Get session data
  app.get("/api/sessions", (req, res) => {
    const sessions = Object.entries(sessionData).map(([id, data]) => ({
      id: parseInt(id),
      title: data.title,
      description: data.title
    }));
    res.json(sessions);
  });

  // Validate participant email for badge generation
  app.post("/api/validate-participant", (req, res) => {
    try {
      const validatedData = badgeGenerationSchema.parse(req.body);
      const { email, sessionId } = validatedData;
      
      const session = sessionData[sessionId as keyof typeof sessionData];
      if (!session) {
        return res.status(400).json({ 
          error: "Invalid session ID",
          authorized: false 
        });
      }

      const isAuthorized = session.allowedEmails.includes(email);
      
      if (!isAuthorized) {
        return res.status(403).json({ 
          error: "You are not authorized to generate the badge. Please use your registered email.",
          authorized: false
        });
      }

      res.json({ 
        authorized: true,
        sessionTitle: session.title
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: "Invalid request data",
          authorized: false,
          details: error.errors
        });
      }
      
      res.status(500).json({ 
        error: "Internal server error",
        authorized: false
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
