import { Button } from "@/components/ui/button";
import { Brain, MessageCircle, BarChart3, BookOpen, Wind, Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: Brain },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
    { id: 'mood', label: 'Mood Tracker', icon: BarChart3 },
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Mind-Mate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {user && navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className="flex items-center space-x-2 transition-gentle"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            {user && (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.user_metadata?.display_name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}

            {!user && (
              <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {user && navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-start space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            {user && (
              <div className="space-y-2 pt-2 border-t">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Welcome, {user.user_metadata?.display_name || user.email}
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-start space-x-2"
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            )}

            {!user && (
              <Button 
                variant="default" 
                className="w-full flex items-center justify-start space-x-2"
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;