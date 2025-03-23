import supabase from "../../config/supabase";
import { Request, Response } from "express";


export const add_attendee = async (req: Request, res: Response) => {
    try{
        // Fetch params
        const event_id = req.query.event_id as string;
        const person_email = req.query.person_email as string;
        const person_text = req.query.person_text as string;
        if(!event_id || !person_email || !person_text) {
            res.status(400).json({ error: `Missing required parameters: event_id, person_email, and person_text` });
            return;
        }
        console.log("Adding to event for event ID:", event_id, "with email:", person_email, "and text:", person_text);
        const { data, error } = await supabase.rpc('add_attendee',{
            event_id: event_id,
            person_email: person_email,
            person_text: person_text
        })
        if(!data) {
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