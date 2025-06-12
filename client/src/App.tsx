import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Session1 from "@/pages/session1";
import Session2 from "@/pages/session2";
import Session3 from "@/pages/session3";
import Session4 from "@/pages/session4";
import Session5 from "@/pages/session5";
import Session6 from "@/pages/session6";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Session1} />
      <Route path="/session-2" component={Session2} />
      <Route path="/session-3" component={Session3} />
      <Route path="/session-4" component={Session4} />
      <Route path="/session-5" component={Session5} />
      <Route path="/session-6" component={Session6} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
