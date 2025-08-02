import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/integrations/supabase/supabase";
import z from "zod";

const joinRoomSchema = z.object({
  roomCode: z.string().length(6, "Room code must be exactly 6 characters"),
});
type Room = {
  id: string;
  room_code: string;
  name: string;
}

export const joinRoom = createServerFn({
  method: "POST",
})
  .validator(joinRoomSchema)
  .handler(async ({ data }): Promise<Room> => {
    const supabase = getSupabaseServerClient();

    const { data: room, error } = await supabase
      .from("rooms")
      .select('id, room_code, name')
      .eq('room_code', data.roomCode.trim().toUpperCase())
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!room) {
      throw new Error("Room not found or invalid code");
    }

    // Return the room directly, not wrapped in an object
    return {
      id: room.id,
      room_code: room.room_code,
      name: room.name,
    };
  });