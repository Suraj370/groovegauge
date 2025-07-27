import { Link, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '../hooks/useMutation'
import { loginFn } from '../routes/__authed'
import { signupFn } from '../routes/signup'
import { Music } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react'
import { Label } from './ui/label'
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const loginMutation = useMutation({
    fn: loginFn,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        await router.invalidate()
        router.navigate({ to: '/' })
      }
    },
  })

  const signupMutation = useMutation({
    fn: useServerFn(signupFn),
  })

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement)

    loginMutation.mutate({
          data: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          },
        })
  };

  const isSubmitting = loginMutation.status === 'pending'

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-music-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-music-secondary transition-colors">
            <Music className="w-8 h-8" />
            MusicSync
          </Link>
          <p className="text-muted-foreground">Welcome back to the collaborative music experience</p>
        </div>

        <Card className="border-music-primary/20">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
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
              <Button 
                type="submit" 
                className="w-full" 
                variant="secondary"
                // disabled={loginMutation.isPending}
              >
                {/* {loginMutation.isPending ? "Signing in..." : "Sign In"} */}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
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
