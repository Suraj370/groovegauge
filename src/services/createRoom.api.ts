import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "@/integrations/supabase/supabase";
import z from "zod";

const createRoomSchema = z.object({
    name: z.string().min(1, "Room name is required"),
})

export const createRoom = createServerFn({
  method: "POST",
})
  .validator(createRoomSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
     const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) throw new Error('Unauthenticated')


    
    const { data: code, error: codeErr } = await supabase.rpc('generate_room_code')
    if (codeErr || !code) throw codeErr ?? new Error('Code generation failed')
    const { data: room, error } = await supabase
      .from("rooms")
      .insert({ name: data.name, room_code: code, creator_id: auth.user.id })
      .select()
      .single();

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return room;
  });