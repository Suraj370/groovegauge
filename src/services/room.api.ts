import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { getSupabaseServerClient } from "@/integrations/supabase/supabase";

const getRoomDetailsSchema = z.object({
  roomId: z.string(),
});

export type RoomDetails = {
  id: string;
  name: string;
  room_code: string;
  created_at: string;
  creator_id: string;
};

export const getRoomDetails = createServerFn({
  method: "GET",
})
  .validator(getRoomDetailsSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();


    const { data: room, error } = await supabase
      .from("rooms")
      .select(`
        id,
        name,
        room_code,
        created_at,
        creator_id
      `)
      .eq('id', data.roomId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error("Room not found");
      }
      throw new Error(`Failed to fetch room details: ${error.message}`);
    }

    if (!room) {
      throw new Error("Room not found");
    }

    // Return simplified room data
    return {
      id: room.id,
      name: room.name,
      room_code: room.room_code,
      created_at: room.created_at,
      creator_id: room.creator_id,
    };
  });