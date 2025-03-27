
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Campaigns from "./pages/Campaigns";
import Automation from "./pages/Automation";
import ProxyProfiles from "./pages/ProxyProfiles";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/leads" element={<Layout><Leads /></Layout>} />
          <Route path="/campaigns" element={<Layout><Campaigns /></Layout>} />
          <Route path="/automation" element={<Layout><Automation /></Layout>} />
          <Route path="/proxy-profiles" element={<Layout><ProxyProfiles /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
