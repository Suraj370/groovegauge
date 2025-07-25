import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '../supabase';

// ---------- helpers ----------
export const getGuestId = (): string => {
  let id = localStorage.getItem('guest_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('guest_id', id);
  }
  return id;
};

// ---------- queries ----------
const ROOM_KEY = 'room';

export const useRoom = (roomId: string) => {
  return useQuery({
    queryKey: [ROOM_KEY, roomId],
    queryFn: async () => {
      // room + songs
      const { data: room, error: rErr } = await supabase
        .from('rooms')
        .select('*, songs(*)')
        .eq('id', roomId)
        .single();
      if (rErr) throw rErr;

      // likes by this guest
      const guest_id = getGuestId();
      const { data: likes } = await supabase
        .from('song_likes')
        .select('song_id')
        .eq('guest_id', guest_id);
      const liked = new Set(likes?.map(l => l.song_id));
      room.songs.forEach((s: any) => (s.likedByMe = liked.has(s.id)));
      return room;
    },
  });
};

export const useAddSong = (roomId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (song: {
      youtube_id: string;
      title: string;
      thumbnail: string;
    }) => supabase.from('songs').insert({ ...song, room_id: roomId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [ROOM_KEY, roomId] }),
  });
};

export const useLikeSong = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ songId, like }: { songId: string; like: boolean }) => {
      const guest_id = getGuestId();
      if (like) {
        await supabase.from('song_likes').insert({ song_id: songId, guest_id });
        await supabase.rpc('increment_likes', { song_id: songId });
      } else {
        await supabase.from('song_likes').delete().match({ song_id: songId, guest_id });
        await supabase.rpc('decrement_likes', { song_id: songId });
      }
    },
    onSuccess: (_, { songId }) => qc.invalidateQueries(),
  });
};

// ---------- realtime ----------
export const useRealtimeRoom = (roomId: string) => {
  const qc = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel(`room:${roomId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'songs', filter: `room_id=eq.${roomId}` },
        () => qc.invalidateQueries({ queryKey: [ROOM_KEY, roomId] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, qc]);
};