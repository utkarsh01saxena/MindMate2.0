import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Lightbulb, Save, RefreshCw } from "lucide-react";
import { useState } from "react";

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(0);
  
  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment today when you felt proud of yourself.",
    "What's one challenge you're facing, and how might you approach it?",
    "Write about a person who makes you feel supported and why.",
    "What's something new you learned about yourself recently?",
    "If today had a color, what would it be and why?",
    "What's one small step you can take tomorrow to care for yourself?",
    "Describe a place where you feel most at peace.",
  ];

  const handleSaveEntry = () => {
    if (!journalEntry.trim()) return;
    
    // Here you would typically save to localStorage or backend
    console.log('Saving journal entry:', {
      prompt: prompts[currentPrompt],
      entry: journalEntry,
      date: new Date().toISOString()
    });
    
    // Reset form
    setJournalEntry('');
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  const getNewPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Guided Journaling</h2>
        <p className="text-muted-foreground">
          Reflect on your thoughts and feelings with thoughtfully crafted prompts
        </p>
      </div>

      {/* Journal Prompt */}
      <Card className="p-6 bg-gradient-card border-0 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warm-purple-light rounded-full">
              <Lightbulb className="h-5 w-5 text-warm-purple" />
            </div>
            <h3 className="text-xl font-semibold">Today's Reflection</h3>
          </div>
          
          <Button
            variant="outline"
            onClick={getNewPrompt}
            className="flex items-center space-x-2 border-warm-purple/20 hover:bg-warm-purple/5"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Prompt</span>
          </Button>
        </div>

        <div className="bg-background/70 p-4 rounded-lg mb-6 border border-warm-purple/20">
          <p className="text-lg text-foreground italic">
            "{prompts[currentPrompt]}"
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="journal-entry" className="text-base font-medium">
            Your thoughts...
          </Label>
          <Textarea
            id="journal-entry"
            placeholder="Take your time and write from the heart. There's no right or wrong way to express yourself here."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="min-h-[300px] text-base leading-relaxed border-calm-blue/20 focus:border-calm-blue"
          />
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{journalEntry.length} characters</span>
            <span>~{Math.ceil(journalEntry.split(' ').length / 200)} min read</span>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button 
            onClick={handleSaveEntry}
            disabled={!journalEntry.trim()}
            className="flex items-center space-x-2 bg-gradient-mood hover:shadow-glow transition-gentle"
          >
            <Save className="h-4 w-4" />
            <span>Save Entry</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setJournalEntry('')}
            className="border-border/50"
          >
            Clear
          </Button>
        </div>
      </Card>

      {/* Recent Entries */}
      <Card className="p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Recent Entries</h3>
        </div>

        <div className="space-y-4">
          {/* Mock entries */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Yesterday • "What are three things you're grateful for today?"
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-3">
              Today I'm grateful for the warm cup of coffee I had this morning, 
              the call from my friend who always knows how to make me laugh, 
              and the peaceful walk I took in the park...
            </p>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                2 days ago • "Describe a moment today when you felt proud of yourself."
              </span>
            </div>
            <p className="text-sm text-foreground line-clamp-3">
              I felt really proud when I finally finished that project I'd been 
              putting off for weeks. It wasn't perfect, but I did it, and that 
              feeling of accomplishment was amazing...
            </p>
          </div>

          <Button variant="outline" className="w-full mt-4">
            View All Entries
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Journal;