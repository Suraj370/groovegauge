import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Music } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Music className="h-6 w-6 text-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MusicSync</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
           <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild variant= "hero" size="sm">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;