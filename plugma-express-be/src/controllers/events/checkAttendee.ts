import supabase from "../../config/supabase";
import { Request, Response } from "express";


export const checkAttendance = async (req: Request, res: Response) => {
    try{
        // Fetch params
        const event_id = req.query.event_id as string;
        const user_id = req.query.user_id as string;
        if(!event_id || !user_id) {
            res.status(400).json({ error: `Missing required parameters: event_id and user_id 
                user: ${user_id}
                community: ${event_id}`
                });
            return;
        }
        console.log("Fetching community events for community ID:", event_id, "and user ID:", user_id);
        const { data, error } = await supabase.rpc('check_attendee',{
            event_id: event_id,
            user_id: user_id
        })
        console.log(error);
        console.log(data);
        if(!data) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch community events due to error" });
            return;
        }
        console.log("Successfully fetched community events:", data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch community events due to " + error });
        return;
    }
}