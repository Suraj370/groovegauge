import { Button } from "@/components/ui/button";
import { Play, Users, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r  from-primary/10 to-accent/10 opacity-50" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Music2 className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
          <Users className="h-6 w-6 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-14 h-14 rounded-full bg-sky-400/20 flex items-center justify-center">
          <Play className="h-7 w-7 text-sky-400" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6  bg-gradient-to-r from-primary to-accent  bg-clip-text text-transparent leading-tight">
            Create Music Rooms,
            <br />
            Listen Together
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Host collaborative music sessions where everyone can add their favorite tracks. 
            Create the perfect playlist together, in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant= "hero" size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
              <Play className="h-5 w-5 mr-2" />
              <Link to="/createRoom">Create Your Room</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/joinRoom">Join a Room</Link>
            </Button>
          </div>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
              <Users className="h-6 w-6 text-music-primary" />
              <span className="text-foreground font-medium">Real-time Collaboration</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
              <Music2 className="h-6 w-6 text-music-secondary" />
              <span className="text-foreground font-medium">Shared Playlists</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
              <Play className="h-6 w-6 text-music-accent" />
              <span className="text-foreground font-medium">Instant Playback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;