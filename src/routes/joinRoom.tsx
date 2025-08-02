import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Music } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {  useState } from 'react';
import { useMutation } from '@/hooks/useMutation';
import { joinRoom } from '@/services/joinRoom.api';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';
export const Route = createFileRoute('/joinRoom')({
  component: RouteComponent,
})

function RouteComponent() {
    const [roomCode, setRoomCode] = useState('');
    const router = useRouter();

const joinRoomMutation = useMutation({
  fn: joinRoom,
  onSuccess: async ({ data }) => {
    // No need to check if data exists if your server function throws on error
    toast.success("Joined room successfully!");
    await router.invalidate();
    router.navigate({ to: `/room/${data?.id}` });
  },
  onError: (error) => {
    toast.error(error.message || "Failed to join room");
  },
});


  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    joinRoomMutation.mutate({
      data: { roomCode },
    });
  }
  return (
     <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto">
              <Music className="h-8 w-8 text-background" />
            </div>
            <CardTitle className="text-2xl">Join Room</CardTitle>
            <CardDescription>
              Enter the room code to join an existing music session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinRoom} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomCode">Room Code</Label>
                <Input
                  id="roomCode"
                  placeholder="Enter 6-digit room code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  maxLength={6}
                  className="text-center text-lg font-mono tracking-wider"
                  disabled={joinRoomMutation.status === 'pending'}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={joinRoomMutation.status === 'pending' || !roomCode.trim()}
              >
                {joinRoomMutation.status === 'pending' ? "Joining..." : "Join Room"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have a room code?{" "}
            <Link to="/createRoom" className="text-primary hover:underline">
              Create a new room
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
