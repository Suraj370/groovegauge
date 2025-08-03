// routes/room/$roomId.tsx
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getRoomDetails } from '@/services/room.api'; // Your server function
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export const Route = createFileRoute('/room/$id')({
  component: RoomComponent,
});

function RoomComponent() {
   const { id: roomId } = useParams({ from: '/room/$id' });

  const [copied, setCopied] = useState(false);
  
  // useQuery directly in the component
  const { 
    data: room, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['room-details', roomId],
    queryFn: async () => {
      // Call it exactly like your other server functions
      return await getRoomDetails({ 
        data: { roomId }
        });
    },
    enabled: !!roomId, // Only run if roomId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error.message.includes('Room not found')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const copyRoomCode = async () => {
    if (room?.room_code) {
      try {
        await navigator.clipboard.writeText(room.room_code);
        setCopied(true);
        toast.success("Room code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error("Failed to copy room code");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <div className="text-center">
          <Music className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">
              {error.message || "Failed to load room"}
            </p>
            <Button onClick={() => refetch()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-16">
        <p>Room not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Add proper navbar spacing */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Room Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-primary">
                    <Music className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <CardDescription>
                      Room Code: {room.room_code}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-3 py-2 rounded text-sm font-mono">
                    {room.room_code}
                  </code>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyRoomCode}
                    disabled={copied}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Room Info */}
          <Card>
            <CardHeader>
              <CardTitle>Room Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Room ID</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1">
                    {room.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm mt-1">
                    {new Date(room.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Creator ID</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1">
                    {room.creator_id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Room Code</p>
                  <p className="text-sm font-mono bg-muted px-2 py-1 rounded mt-1">
                    {room.room_code}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Music Player Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Music Player
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <div className="mb-6">
                  <Music className="h-16 w-16 mx-auto opacity-30" />
                </div>
                <h3 className="text-lg font-medium mb-2">Music player coming soon...</h3>
                <p className="text-sm">
                  Share the room code <span className="font-mono bg-muted px-2 py-1 rounded font-semibold">{room.room_code}</span> with friends to invite them!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}