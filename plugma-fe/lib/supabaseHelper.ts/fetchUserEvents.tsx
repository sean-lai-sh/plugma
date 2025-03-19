import { supabase } from "@/lib/supabaseClient";

export async function fetchUserEvents() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) {
        return null; // User not authenticated
    }
    const userId = user.id;
    let { data, error } = await supabase
        .rpc('get_user_events', {
            userId
        })
    if (error) console.error(error)
    return data ? data : null; // Return events or null if none found
  } catch (error) {
    console.error("Unexpected error fetching events:", error);
    return null;
  }
}
