import supabase from "../../config/supabase";
import { Request, Response } from "express";

export const fetchUserCommunityEvents = async (req: Request, res: Response) => {
    try {
        const user_id = req.query.user_id as string;

        if (!user_id) {
            res.status(400).json({ error: "Missing required parameter: user_id" });
            return;
        }
        // Step 1: Fetch all communities for the user
        const { data, error } = await supabase.rpc('all_community_events', {
            user_id: user_id
        })
        if(error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch community events due to error" });
            return;
        }
        console.log("Successfully fetched community events:", data);
        res.status(200).json(data);

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Unexpected error occurred while fetching data" });
    }
};
