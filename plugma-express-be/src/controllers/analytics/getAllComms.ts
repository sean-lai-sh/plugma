import supabase from "../../config/supabase";
import { Request, Response } from "express";


export const allcomms = async (req: Request, res: Response) => {
    try{
        // Fetch params
        const user_id = req.query.user_id as string;
        if(!user_id) {
            res.status(400).json({ error: `Missing required parameters: event_id and user_id` });
            return;
        }
        const { data, error } = await supabase.from('communities').select("*").eq('creator_id', user_id)
        if(error) {
            console.error(error);
            
            res.status(500).json({ error: "Failed to add attendee due to error" });
            return;
        }
        console.log("Successfully fetched communities:", data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch community events due to " + error });
        return;
    }
}