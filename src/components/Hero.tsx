import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-gentle-fade">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-card rounded-full shadow-glow animate-float">
              <Heart className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Mental Wellbeing
            </span>{" "}
            Companion
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered support for your mental health journey. Track your mood, chat with our empathetic assistant, and reflect through guided journaling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-4 bg-gradient-hero hover:shadow-glow transition-gentle group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-primary/20 hover:bg-primary/5 transition-gentle"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-calm-green mb-2">100%</div>
              <div className="text-muted-foreground">Private & Secure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-purple mb-2">∞</div>
              <div className="text-muted-foreground">Personalized Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;