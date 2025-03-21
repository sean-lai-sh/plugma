import { Request, Response } from "express";
import prisma from "../../config/prisma";
import supabase from "../../config/supabase";
import axios from "axios";

type createEventType = {
  approval_required: boolean, 
  capacity : number, 
  community_name : string, 
  creator_id : string, 
  end_date : Date, 
  event_date : Date, 
  event_description : string, 
  event_name : string, 
  event_tags : string[], 
  is_private : boolean, 
  is_virtual : boolean, 
  location_address : string, 
  location_name : string, 
  payment_amount : number, 
  payment_currency : string, 
  timezone: string, 
  virtual_meeting_url: string | null,
  image: string | null,
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    console.log("Creating event with data:", req.body);
    /// Format the data from the request body

    const newEvent :createEventType= req.body;
    //deconstruct the newEvent object
    const {
      approval_required, 
      capacity, 
      community_name, 
      creator_id, 
      end_date, 
      event_date, 
      event_description, 
      event_name, 
      event_tags, 
      is_private, 
      is_virtual, 
      location_address, 
      location_name, 
      payment_amount, 
      payment_currency, 
      timezone, 
      virtual_meeting_url,
      image
    } = newEvent;
    const encodedAddr = encodeURIComponent(newEvent.location_address);

    // const responseURL = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddr}&apiKey=${process.env.HERE_LOCATION_API_KEY}`;
  
    // const locationResponse = await axios.get(responseURL);
    // let coordinates : string | null = null;
    // // Concat into a formatted string (on fe use split(' ') to get lat and long)
    // if(locationResponse.data.items.length > 0) {
    //   coordinates = `${locationResponse.data.items[0].position.lat} ${locationResponse.data.items[0].position.lng}`;
    // }

     const location_coordinates = "37.7749 -122.4194"; // Placeholder for coordinates, replace with actual geocoding logic

    //type cast coordinates to point type for supabase
    // const [lat, long] = coordinates ? coordinates.split(' ') : [null, null];
    // const pointCoordinates = lat && long ? `POINT(${lat} ${long})` : null;
    
    const { data, error } = await supabase.rpc("add_event", {
      event_name,
      event_description,
      event_date,
      end_date,
      community_name,
      creator_id,
      approval_required,
      is_private,
      capacity,
      payment_amount,
      payment_currency,
      location_name,
      location_address,
      location_coordinates,
      is_virtual,
      virtual_meeting_url,
      event_tags,
      timezone,
      image
    });
    if (error) {
      console.error("Error creating event:", error);
      throw new Error(error.message);
    } else {
      console.log("Event created with ID:", data);
      res.status(200).json({ message: "Event created successfully, redirect link here", data });
    }
    

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

