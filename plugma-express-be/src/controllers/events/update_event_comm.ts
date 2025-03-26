import supabase from "../../config/supabase";
import { Request, Response } from "express";
import { getCommID } from "../analytics/getCommID";


export const update_event_comm = async (req: Request, res: Response) => {
    try {
      // Fetch params
      const event_id = req.query.event_id as string;
      const user_id = req.query.user_id as string;
      const comm_name = req.query.comm_name as string;
  
      if (!event_id || !user_id) {
        res.status(400).json({ error: `Missing required parameters: event_id and user_id` });
        return;
      }
      console.log("Updating event for event ID:", event_id, "with user ID:", user_id);
  
      // Fetch the community matching the user and community name
      const { data: communityData, error: communityError } = await supabase
        .from('communities')
        .select("*")
        .eq('creator_id', user_id)
        .eq('name', comm_name);
  
      if (communityError) {
        console.error("Error fetching community:", communityError);
        res.status(500).json({ error: "Error fetching community" });
        return;
      }
  
      let community_id = '';
  
      if (communityData && communityData.length > 0) {
        // Community exists: extract the id (adjust field name if necessary)
        community_id = communityData[0].community_id || communityData[0].id;
      } else {
        // Community not found: insert new community
        const { data: insertedData, error: insertError } = await supabase
          .from('communities')
          .insert({
            creator_id: user_id,
            name: comm_name
          });
        console.log("Insert community result:", insertError, insertedData);
        if (!insertedData) {
          console.error("Failed to insert community:", insertError);
          res.status(500).json({ error: "Failed to insert community" });
          return;
        }else{
            community_id = insertedData[0];
            console.log("Successfully inserted community:", community_id);
        }
        
      }
      
      console.log("Successfully fetched or inserted community id:", community_id);
  
      // Update the event with the fetched community_id.
      // Note: Adjust the filters below to match your schema. For example, if event_id is stored as "id" in events.
      const { data, error } = await supabase
        .from('events')
        .update({
          community_id
        })
        .eq('event_id', event_id) // Assuming "id" is the event's primary key
        .eq('creator_id', user_id); // If applicable
  
      console.log("Update event result:", error, data);
      if (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event due to error" });
        return;
      }
      console.log("Successfully updated event:", data);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in update_event_comm:", error);
      res.status(500).json({ error: "Failed to update event due to " + error });
      return;
    }
  };
  