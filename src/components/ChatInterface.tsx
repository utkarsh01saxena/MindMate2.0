import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm here to support you on your mental wellbeing journey. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "Thank you for sharing. I hear that you're going through something important. Would you like to tell me more about what's on your mind?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">AI Mental Health Companion</h2>
        <p className="text-muted-foreground">Share your thoughts and feelings in a safe, judgment-free space</p>
      </div>

      <Card className="h-[600px] flex flex-col bg-gradient-card border-0 shadow-soft">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-warm-purple-light text-warm-purple'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <div className={`max-w-[80%] p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background border border-border'
              }`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border bg-background/50">
          <div className="flex space-x-2">
            <Input
              placeholder="Share what's on your mind..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-calm-blue/20 focus:border-calm-blue"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-gradient-mood hover:shadow-glow transition-gentle"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "I'm feeling anxious",
              "Having trouble sleeping",
              "Feeling overwhelmed",
              "Need motivation"
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(suggestion)}
                className="text-xs border-primary/20 hover:bg-primary/5"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;