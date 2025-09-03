import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, Heart, Zap, Cloud, Sun } from "lucide-react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MoodEntry {
  date: string;
  mood: number;
  emotions: string[];
  note: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');
  
  // Mock data for the chart
  const mockData = [
    { date: '2024-01-01', mood: 7 },
    { date: '2024-01-02', mood: 6 },
    { date: '2024-01-03', mood: 8 },
    { date: '2024-01-04', mood: 5 },
    { date: '2024-01-05', mood: 7 },
    { date: '2024-01-06', mood: 9 },
    { date: '2024-01-07', mood: 6 },
  ];

  const moods = [
    { value: 1, icon: Frown, label: 'Very Low', color: 'text-red-500' },
    { value: 3, icon: Meh, label: 'Low', color: 'text-orange-500' },
    { value: 5, icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
    { value: 7, icon: Smile, label: 'Good', color: 'text-green-500' },
    { value: 9, icon: Smile, label: 'Excellent', color: 'text-emerald-500' },
  ];

  const emotions = [
    { name: 'Happy', icon: Sun, color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Grateful', icon: Heart, color: 'bg-pink-100 text-pink-700' },
    { name: 'Energetic', icon: Zap, color: 'bg-blue-100 text-blue-700' },
    { name: 'Calm', icon: Cloud, color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Anxious', icon: Cloud, color: 'bg-gray-100 text-gray-700' },
    { name: 'Sad', icon: Cloud, color: 'bg-blue-100 text-blue-600' },
  ];

  const handleSaveMood = () => {
    if (selectedMood === null) return;
    
    // Here you would typically save to localStorage or backend
    console.log('Saving mood:', { selectedMood, selectedEmotions, note });
    
    // Reset form
    setSelectedMood(null);
    setSelectedEmotions([]);
    setNote('');
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Mood Tracker</h2>
        <p className="text-muted-foreground">Track your daily emotions and see patterns over time</p>
      </div>

      {/* Mood Entry */}
      <Card className="p-6 bg-gradient-card border-0 shadow-soft">
        <h3 className="text-xl font-semibold mb-6">How are you feeling today?</h3>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block">Rate your overall mood</Label>
          <div className="flex justify-between gap-2">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-gentle hover:bg-background/50 ${
                    selectedMood === mood.value ? 'bg-primary/10 border-2 border-primary' : 'border-2 border-transparent'
                  }`}
                >
                  <Icon className={`h-8 w-8 mb-2 ${mood.color}`} />
                  <span className="text-sm font-medium">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Emotions */}
        <div className="mb-6">
          <Label className="text-base font-medium mb-3 block">What emotions are you experiencing?</Label>
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => {
              const Icon = emotion.icon;
              return (
                <button
                  key={emotion.name}
                  onClick={() => toggleEmotion(emotion.name)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-gentle ${
                    selectedEmotions.includes(emotion.name)
                      ? 'bg-primary text-primary-foreground'
                      : emotion.color
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{emotion.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mb-6">
          <Label htmlFor="note" className="text-base font-medium mb-3 block">
            Any additional thoughts? (Optional)
          </Label>
          <Textarea
            id="note"
            placeholder="What's contributing to how you feel today?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px] border-calm-blue/20 focus:border-calm-blue"
          />
        </div>

        <Button 
          onClick={handleSaveMood}
          disabled={selectedMood === null}
          className="w-full bg-gradient-mood hover:shadow-glow transition-gentle"
        >
          Save Today's Mood
        </Button>
      </Card>

      {/* Mood History Chart */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-xl font-semibold mb-6">Your Mood Trends</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[1, 10]} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: any) => [value, 'Mood Score']}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--calm-blue))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--calm-blue))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;