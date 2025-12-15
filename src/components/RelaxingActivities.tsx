import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Music, Leaf, Moon, Heart, Wind } from "lucide-react";

const activities = [
  {
    icon: Wind,
    title: "Deep Breathing",
    description: "Take 5 slow, deep breaths. Inhale for 4 seconds, hold for 4, exhale for 6.",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
  },
  {
    icon: Music,
    title: "Listen to Calming Music",
    description: "Put on your favorite soothing playlist or nature sounds for 10 minutes.",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Leaf,
    title: "Take a Nature Walk",
    description: "Step outside and observe the trees, sky, and sounds around you mindfully.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Moon,
    title: "Progressive Relaxation",
    description: "Tense and release each muscle group from your toes to your head.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Heart,
    title: "Gratitude Journaling",
    description: "Write down 3 things you're grateful for today, no matter how small.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Sparkles,
    title: "Mindful Meditation",
    description: "Sit quietly for 5 minutes, focusing only on the present moment.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const RelaxingActivities = () => {
  return (
    <section className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Mind Relaxing Activities
        </h2>
        <p className="text-muted-foreground">
          Simple practices to help calm your mind and reduce stress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${activity.bgColor} transition-transform group-hover:scale-110`}>
                  <activity.icon className={`h-6 w-6 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelaxingActivities;
