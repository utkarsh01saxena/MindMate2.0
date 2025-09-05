import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import MoodTracker from "@/components/MoodTracker";
import BreathingExercises from "@/components/BreathingExercises";
import Journal from "@/components/Journal";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
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
    switch (activeSection) {
      case 'chat':
        return <ChatInterface />;
      case 'mood':
        return <MoodTracker />;
      case 'breathing':
        return <BreathingExercises />;
      case 'journal':
        return <Journal />;
      default:
        return <Hero onGetStarted={() => setActiveSection('chat')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="container mx-auto px-6 py-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
