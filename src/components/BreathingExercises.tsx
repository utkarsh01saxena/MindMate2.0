import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Zap, Clock, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfterExhale?: number;
  color: string;
}

const breathingPatterns: BreathingPattern[] = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "Calming technique for anxiety and better sleep",
    icon: Zap,
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: "from-blue-400 to-purple-600"
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal timing for focus and stress relief",
    icon: Clock,
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
    color: "from-green-400 to-blue-500"
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "5-5 rhythm for heart rate variability",
    icon: Heart,
    inhale: 5,
    hold: 0,
    exhale: 5,
    color: "from-pink-400 to-red-500"
  }
];

type Phase = "inhale" | "hold" | "exhale" | "holdAfterExhale";

const BreathingExercises = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>("inhale");
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale);
  const [totalCycles, setTotalCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const getPhaseDisplay = (phase: Phase) => {
    switch (phase) {
      case "inhale": return "Breathe In";
      case "hold": return "Hold";
      case "exhale": return "Breathe Out";
      case "holdAfterExhale": return "Hold";
      default: return "";
    }
  };

  const getNextPhase = (): { phase: Phase; duration: number } => {
    switch (currentPhase) {
      case "inhale":
        return selectedPattern.hold > 0 
          ? { phase: "hold", duration: selectedPattern.hold }
          : { phase: "exhale", duration: selectedPattern.exhale };
      case "hold":
        return { phase: "exhale", duration: selectedPattern.exhale };
      case "exhale":
        return selectedPattern.holdAfterExhale 
          ? { phase: "holdAfterExhale", duration: selectedPattern.holdAfterExhale }
          : { phase: "inhale", duration: selectedPattern.inhale };
      case "holdAfterExhale":
        return { phase: "inhale", duration: selectedPattern.inhale };
      default:
        return { phase: "inhale", duration: selectedPattern.inhale };
    }
  };

  const getCircleScale = () => {
    const totalDuration = getCurrentPhaseDuration();
    const progress = (totalDuration - timeLeft) / totalDuration;
    
    if (currentPhase === "inhale") {
      return 0.5 + (progress * 0.5); // Scale from 0.5 to 1
    } else if (currentPhase === "exhale") {
      return 1 - (progress * 0.5); // Scale from 1 to 0.5
    }
    return currentPhase === "hold" || currentPhase === "holdAfterExhale" ? 1 : 0.5;
  };

  const getCurrentPhaseDuration = () => {
    switch (currentPhase) {
      case "inhale": return selectedPattern.inhale;
      case "hold": return selectedPattern.hold;
      case "exhale": return selectedPattern.exhale;
      case "holdAfterExhale": return selectedPattern.holdAfterExhale || 0;
      default: return selectedPattern.inhale;
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const { phase, duration } = getNextPhase();
      if (phase === "inhale") {
        setTotalCycles(prev => prev + 1);
      }
      setCurrentPhase(phase);
      setTimeLeft(duration);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, currentPhase, selectedPattern]);

  const startExercise = () => {
    setIsActive(true);
    toast({
      title: "Breathing exercise started",
      description: `Follow the ${selectedPattern.name} pattern`,
    });
  };

  const pauseExercise = () => {
    setIsActive(false);
    toast({
      title: "Exercise paused",
      description: "Take your time",
    });
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase("inhale");
    setTimeLeft(selectedPattern.inhale);
    setTotalCycles(0);
    toast({
      title: "Exercise reset",
      description: "Ready for a fresh start",
    });
  };

  const selectPattern = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setIsActive(false);
    setCurrentPhase("inhale");
    setTimeLeft(pattern.inhale);
    setTotalCycles(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Breathing Exercises
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice mindful breathing to reduce stress, improve focus, and promote relaxation
          </p>
        </div>

        {/* Breathing Pattern Selection */}
        <div className="grid md:grid-cols-3 gap-4">
          {breathingPatterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <Card 
                key={pattern.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedPattern.id === pattern.id 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => selectPattern(pattern)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{pattern.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {pattern.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {pattern.inhale}-{pattern.hold}-{pattern.exhale}
                    {pattern.holdAfterExhale && `-${pattern.holdAfterExhale}`} seconds
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Breathing Interface */}
        <Card className="p-8">
          <div className="text-center space-y-8">
            {/* Visual Breathing Guide */}
            <div className="relative flex items-center justify-center h-80">
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedPattern.color} opacity-20 transition-transform duration-1000 ease-in-out`}
                style={{ 
                  transform: `scale(${getCircleScale()})`,
                  maxWidth: '300px',
                  maxHeight: '300px',
                  margin: 'auto'
                }}
              />
              <div 
                className={`relative z-10 w-48 h-48 rounded-full bg-gradient-to-r ${selectedPattern.color} flex items-center justify-center text-white font-semibold text-xl shadow-2xl transition-transform duration-1000 ease-in-out`}
                style={{ transform: `scale(${getCircleScale()})` }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">{getPhaseDisplay(currentPhase)}</div>
                  <div className="text-lg">{timeLeft}s</div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{selectedPattern.name}</h3>
              <p className="text-muted-foreground">{selectedPattern.description}</p>
              <div className="text-sm text-muted-foreground">
                Completed cycles: {totalCycles}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {!isActive ? (
                <Button onClick={startExercise} className="px-8">
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={pauseExercise} variant="secondary" className="px-8">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={resetExercise} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Breathing Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Getting Started</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Find a quiet, comfortable space</li>
                  <li>• Sit or lie down in a relaxed position</li>
                  <li>• Close your eyes or soften your gaze</li>
                  <li>• Start with 3-5 cycles and build up gradually</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Best Practices</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Breathe through your nose when possible</li>
                  <li>• Focus on your diaphragm, not chest</li>
                  <li>• Don't force the breath - stay comfortable</li>
                  <li>• Practice regularly for best results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BreathingExercises;