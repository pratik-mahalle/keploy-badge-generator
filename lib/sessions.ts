export interface Session {
  id: number;
  title: string;
  subtitle: string;
  allowedEmails: string[];
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "API Testing Basics",
    subtitle: "Session 1",
    allowedEmails: ["participant1@keploy.io", "student1@example.com"]
  },
  {
    id: 2,
    title: "Mock Generation",
    subtitle: "Session 2",
    allowedEmails: ["participant2@keploy.io", "student2@example.com"]
  },
  {
    id: 3,
    title: "Test Replay & Analysis",
    subtitle: "Session 3",
    allowedEmails: ["participant3@keploy.io", "student3@example.com"]
  },
  {
    id: 4,
    title: "CI/CD Integration",
    subtitle: "Session 4",
    allowedEmails: ["participant4@keploy.io", "student4@example.com"]
  },
  {
    id: 5,
    title: "Advanced Testing",
    subtitle: "Session 5",
    allowedEmails: ["participant5@keploy.io", "student5@example.com"]
  },
  {
    id: 6,
    title: "Final Project",
    subtitle: "Session 6",
    allowedEmails: ["participant6@keploy.io", "student6@example.com"]
  }
]; 