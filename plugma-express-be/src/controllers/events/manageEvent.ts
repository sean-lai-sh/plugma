import { Request, Response } from "express";
import  supabase from "../../config/supabase";

export const manageEvent = async (req: Request, res: Response) => {
    console.log("Fetching event data for slug:", req.query.slug);
    try{
        const slug = req.query.slug; 
        const userID = req.query.userID; 
        const { data, error } = await supabase.rpc('get_manager_event_view', {
            event_uuid: slug,
            host_id: userID
        })
        
        if(error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch event page data" });
            return;
        }
        console.log("Successfully fetched event page data:", data);
        res.status(200).json(data);
    }catch(error){
        res.status(500).json({ error: "Failed to fetch event page data" });
        return;
    }
}