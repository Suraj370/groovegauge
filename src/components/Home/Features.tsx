import { Card } from "@/components/ui/card";
import { Crown, Users, Music, Headphones, Plus, Volume2 } from "lucide-react";
import createRoomIcon from "@/assets/create-room-icon.jpg";
import joinRoomIcon from "@/assets/join-room-icon.jpg";
import collaborateIcon from "@/assets/collaborate-icon.jpg";

const Features = () => {
  const features = [
    {
      icon: <Crown className="h-8 w-8 text-music-primary" />,
      title: "Host Your Room",
      description: "Create a music room and become the DJ. Control the vibe and curate the perfect atmosphere for your gathering.",
      image: createRoomIcon,
      color: "music-primary"
    },
    {
      icon: <Users className="h-8 w-8 text-music-secondary" />,
      title: "Join the Party",
      description: "Jump into any room with a simple code. No signup required - just enter and start enjoying music together.",
      image: joinRoomIcon,
      color: "music-secondary"
    },
    {
      icon: <Music className="h-8 w-8 text-music-accent" />,
      title: "Collaborative Playlists",
      description: "Everyone can add their favorite tracks. Build the ultimate playlist together, combining everyone's music taste.",
      image: collaborateIcon,
      color: "music-accent"
    }
  ];

  const capabilities = [
    {
      icon: <Plus className="h-6 w-6" />,
      title: "Add Any Song",
      description: "Search and add tracks from your favorite music platforms"
    },
    {
      icon: <Volume2 className="h-6 w-6" />,
      title: "Real-time Sync",
      description: "Everyone hears the same song at the same time"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "High Quality Audio",
      description: "Crystal clear sound for the best listening experience"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, intuitive, and designed for music lovers who want to share their passion
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <div className="mb-6 relative">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-24 h-24 mx-auto rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-background border-2 border-border">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Additional capabilities */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Powerful Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-card/30 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-gradient-primary flex-shrink-0">
                  {capability.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{capability.title}</h4>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;