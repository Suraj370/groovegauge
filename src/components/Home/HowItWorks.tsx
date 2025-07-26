import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Music, Users2, Play } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      icon: <Smartphone className="h-8 w-8" />,
      title: "Create or Join",
      description: "Start by creating a new room or join an existing one with a room code",
      action: "Get room code"
    },
    {
      step: "02", 
      icon: <Music className="h-8 w-8" />,
      title: "Add Your Music",
      description: "Search for your favorite songs and add them to the shared playlist",
      action: "Browse music"
    },
    {
      step: "03",
      icon: <Users2 className="h-8 w-8" />,
      title: "Listen Together",
      description: "Enjoy synchronized playback with friends, family, or party guests",
      action: "Start listening"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-secondary/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
            Get Started in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            It takes less than a minute to create your first collaborative music room
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 z-0" />
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 z-0" />

            {steps.map((step, index) => (
              <Card key={index} className="relative z-10 p-8 text-center bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 group">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                
                <Button variant="outline" size="sm" className="group-hover:bg-gradient-to-r from-primary group-hover:border-music-primary transition-all duration-300">
                  {step.action}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary to-accent/10 text-foreground">
            <div className="flex items-center gap-4">
              <Play className="h-8 w-8" />
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Ready to Start?</h3>
                <p className="text-foreground/80">Create your first music room now</p>
              </div>
              <Button variant="secondary" size="lg" className="ml-4">
                Create Room
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;