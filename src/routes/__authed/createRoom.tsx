import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Copy, Music } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@/hooks/useMutation';
import { createRoom } from '@/services/createRoom.api';

export const Route = createFileRoute('/__authed/createRoom')({
  component: RouteComponent,
})

function RouteComponent() {
  const [roomName, setRoomName] = useState('');
  const [createdRoom, setCreatedRoom] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const createRoomMutation = useMutation({
    fn: createRoom,
    onSuccess: async (ctx) => {
      if (!ctx.data?.error) {
        setCreatedRoom(ctx.data);
        toast("Success", {
          description: "Room created successfully!",
        })
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create room");
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    createRoomMutation.mutate({
      data: { name: roomName },
    });
  }


  





   const copyRoomCode = async () => {
    if (createdRoom?.room_code) {
      await navigator.clipboard.writeText(createdRoom.room_code);
      setCopied(true);
        toast("Success", {
          description: "Room code copied to clipboard!",
        });
      setTimeout(() => setCopied(false), 2000);
    }
  };

   if (createdRoom) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <CheckCircle className="h-8 w-8 text-background" />
              </div>
            </div>
            <CardTitle className="text-2xl">Room Created!</CardTitle>
            <CardDescription>
              Share this code with others to join your music room
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">Room Name</Label>
              <p className="text-lg font-semibold">{createdRoom.name}</p>
            </div>
            
            <div className="text-center">
              <Label className="text-sm text-muted-foreground">Room Code</Label>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 p-4 bg-muted rounded-lg">
                  <span className="text-2xl font-mono font-bold tracking-wider">
                    {createdRoom.room_code}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyRoomCode}
                  className="h-12 w-12"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => setCreatedRoom(null)}
              >
                Create Another Room
              </Button>
              <Link to="/" className="block">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary">
              <Music className="h-8 w-8 text-background" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Music Room</CardTitle>
          <CardDescription>
            Create a new room and invite others to join your music session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={createRoomMutation.status == 'pending' || !roomName.trim()}
            >
              {createRoomMutation.status == 'pending' ? 'Creating...' : 'Create Room'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
}
