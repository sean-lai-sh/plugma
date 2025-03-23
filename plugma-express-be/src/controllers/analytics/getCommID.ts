
import supabase from "../../config/supabase";
import { Request, Response } from "express";


export const getCommID = async (req: Request, res: Response) => {
    try{
        const user_id = req.query.user_id as string;
        const comm_name = req.query.comm_name as string;
        console.log("Fetching community id for community name:", comm_name, "and user ID:", user_id);
        const { data, error } = await supabase.rpc('get_comm_id',{
            user_id: user_id,
            comm_name: comm_name
        })
        console.log(error);
        console.log(data);
        if(!data) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch community id due to error" });
            return;
        }
        console.log("Successfully fetched community id:", data);
        res.status(200).json({comm_id: data});
    }catch(error){
        res.status(500).json({ error: "Failed to fetch community id due to " + error });
        return;
    }
}