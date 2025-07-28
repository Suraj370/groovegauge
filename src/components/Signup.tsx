import { Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '../hooks/useMutation'
import { signupFn } from '../routes/signup'
import { Music } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react'
import { Label } from './ui/label'
import { toast } from 'sonner'

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
    
  })



    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast("Error", {
      description: "Please make sure your passwords match",
    })
      return;
    }
  

   


    signupMutation.mutate({
          data: {
            email,
            password,
          },
        })
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-music-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-music-secondary transition-colors">
            <Music className="w-8 h-8" />
            MusicSync
          </Link>
          <p className="text-muted-foreground">Join the collaborative music experience</p>
        </div>

        <Card className="border-music-primary/20">
          <CardHeader className="text-center">
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Signup to start creating and sharing playlists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                variant="secondary"
                disabled={signupMutation.status == 'pending'}
              >
                {signupMutation.status == 'pending' ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
            { signupMutation.data?.error && (
              <p className="text-red-500 text-sm mt-2">{signupMutation.data.message}</p>
            )}
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
           Have an account?{" "}
            <Link 
              to="/login" 
              className="text-music-primary hover:text-music-secondary transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-music-primary transition-colors block"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
