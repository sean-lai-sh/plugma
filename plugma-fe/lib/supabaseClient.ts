import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
// Boiler plate here; not much to change. (IK These r of type string)
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
