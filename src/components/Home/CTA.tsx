import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Users, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-12 text-center  bg-gradient-to-r from-primary to-accent/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 animate-pulse">
            <Sparkles className="h-6 w-6 text-foreground/30" />
          </div>
          <div className="absolute top-4 right-4 animate-pulse" style={{ animationDelay: '1s' }}>
            <Sparkles className="h-6 w-6 text-foreground/30" />
          </div>
          <div className="absolute bottom-4 left-1/4 animate-pulse" style={{ animationDelay: '2s' }}>
            <Sparkles className="h-6 w-6 text-foreground/30" />
          </div>
          <div className="absolute bottom-4 right-1/4 animate-pulse" style={{ animationDelay: '3s' }}>
            <Sparkles className="h-6 w-6 text-foreground/30" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Create Magic?
            </h2>
            
            <p className="text-xl mb-8 text-foreground/90 max-w-2xl mx-auto">
              Join thousands of music lovers who are already creating unforgettable listening experiences together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90">
                <Play className="h-5 w-5 mr-2" />
                Create Your First Room
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 py-6 text-foreground hover:bg-foreground/10">
                <Users className="h-5 w-5 mr-2" />
                Join a Room
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50" />
                <span>Works on any device</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;