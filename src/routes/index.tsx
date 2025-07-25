import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { supabase } from '../supabase';

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
    const nav = useNavigate();
  const createRoom = async () => {
    const { data } = await supabase.from('rooms').insert({ name: 'Jam Room' }).select().single();
    console.log(data);
    
    nav({ to: '/room/$id', params: { id: data!.id } });
  };
  return (
      <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Guest Jukebox</h1>
      <button
        onClick={createRoom}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Create Room
      </button>
    </div>
  )
}
