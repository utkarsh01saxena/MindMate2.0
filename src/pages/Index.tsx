import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import RelaxingActivities from "@/components/RelaxingActivities";

const Index = () => {
  const [activeSection, setActiveSection] = useState('chat');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderSection = () => {
    return <ChatInterface />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="container mx-auto px-6 py-8">
        {renderSection()}
        <RelaxingActivities />
      </main>
    </div>
  );
};

export default Index;
