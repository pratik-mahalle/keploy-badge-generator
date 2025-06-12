export interface SessionData {
  id: number;
  title: string;
  description: string;
  allowedEmails: string[];
}

export const sessionData: Record<number, SessionData> = {
  1: {
    id: 1,
    title: "API Testing Basics",
    description: "Introduction to API testing fundamentals",
    allowedEmails: ["participant1@keploy.io", "student1@example.com", "test@keploy.io"]
  },
  2: {
    id: 2,
    title: "Mock Generation",
    description: "Creating and managing API mocks",
    allowedEmails: ["participant2@keploy.io", "student2@example.com"]
  },
  3: {
    id: 3,
    title: "Test Replay & Analysis",
    description: "Replaying tests and analyzing results",
    allowedEmails: ["participant3@keploy.io", "student3@example.com"]
  },
  4: {
    id: 4,
    title: "CI/CD Integration",
    description: "Integrating testing in CI/CD pipelines",
    allowedEmails: ["participant4@keploy.io", "student4@example.com"]
  },
  5: {
    id: 5,
    title: "Advanced Testing",
    description: "Advanced testing techniques and strategies",
    allowedEmails: ["participant5@keploy.io", "student5@example.com"]
  },
  6: {
    id: 6,
    title: "Final Project",
    description: "Capstone project and assessment",
    allowedEmails: ["participant6@keploy.io", "student6@example.com"]
  }
};

export const getSessionById = (id: number): SessionData | undefined => {
  return sessionData[id];
};

export const getAllSessions = (): SessionData[] => {
  return Object.values(sessionData);
};
