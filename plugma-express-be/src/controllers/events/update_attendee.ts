import supabase from "../../config/supabase";
import { Request, Response } from "express";


export const update_attendee = async (req: Request, res: Response) => {
    try{
        // Fetch params
        const event_id = req.query.event_id as string;
        const user_id = req.query.user_id as string;
        if(!event_id || !user_id) {
            res.status(400).json({ error: `Missing required parameters: event_id and user_id` });
            return;
        }
        console.log("Adding to event for event ID:", event_id, "with user ID:", user_id);
        const { data, error } = await supabase.from('attendees').update({
            rsvp_status: 'going',
          }).eq('user_reference', user_id).eq('eventidref', event_id);
        console.log(error, data);
        if(error) {
            console.error(error);
            
            res.status(500).json({ error: "Failed to add attendee due to error" });
            return;
        }
        console.log("Successfully added attendee:", data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch community events due to " + error });
        return;
    }
}


