import { Request, Response } from "express";
import prisma from "../../config/prisma";
import supabase from "../../config/supabase";
import axios from "axios";


// Fetch event data based on slug
export const eventPageFetch = async (req: Request, res: Response) => {
    console.log("Fetching event page data for slug:", req.params.slug);
    try{
        const slug = req.params.slug; 
        const { data, error } = await supabase.rpc('get_event_details',{
            event_uuid: slug
        })
        console.log(error);
        console.log(data);
        if(!data) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch event page data due to error" });
            return;
        }
        console.log("Successfully fetched event page data:", data);
        res.status(200).json(data);
        return;
    }catch(error){
        res.status(500).json({ error: "Failed to fetch event page data due to " + error });
        return;
    }
};