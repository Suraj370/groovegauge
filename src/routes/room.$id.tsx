import { createFileRoute, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import YouTube from 'react-youtube';
import { useRoom, useAddSong, useLikeSong, useRealtimeRoom } from '../hooks/useRoom'

export const Route = createFileRoute('/room/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = useParams({ from: '/room/$id' });
  const { data: room, isLoading } = useRoom(id);
  useRealtimeRoom(id);

  const addSong = useAddSong(id);
  const likeSong = useLikeSong();
  const [ytLink, setYtLink] = useState('');

  const handleAdd = async () => {
    const m = ytLink.match(/[?&]v=([^&#]+)/);
    if (!m) return alert('Invalid YouTube link');
    const videoId = m[1];
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    const json = await res.json();
    if (!json.items?.length) return alert('Video not found');
    const snip = json.items[0].snippet;
    await addSong.mutateAsync({
      youtube_id: videoId,
      title: snip.title,
      thumbnail: snip.thumbnails.medium.url,
    });
    setYtLink('');
  };

  if (isLoading) return <p className="p-4">Loading room…</p>;

  const queue = [...room.songs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
      <p className="mb-4 text-sm text-gray-600">
        Share: <span className="underline">{window.location.href}</span>
      </p>

      <div className="flex gap-2 mb-6">
        <input
          value={ytLink}
          onChange={(e) => setYtLink(e.target.value)}
          placeholder="Paste YouTube link"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          disabled={!ytLink}
          className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {queue.map((song, idx) => (
          <li
            key={song.id}
            className={`flex items-center gap-3 p-2 border rounded ${
              idx === 0 ? 'bg-green-100' : ''
            }`}
          >
            <img src={song.thumbnail} className="w-28 h-16 object-cover rounded" alt="" />
            <div className="flex-1 truncate">{song.title}</div>
            <button
              onClick={() => likeSong.mutate({ songId: song.id, like: !song.likedByMe })}
              className={`px-2 py-1 rounded ${
                song.likedByMe ? 'bg-red-500 text-white' : 'bg-gray-200'
              }`}
            >
              ♥ {song.likes}
            </button>
          </li>
        ))}
      </ul>

      {queue.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Now playing</h2>
          <YouTube videoId={queue[0].youtube_id} opts={{ width: '100%', height: '300' }} />
        </div>
      )}
    </div>
  )
}
