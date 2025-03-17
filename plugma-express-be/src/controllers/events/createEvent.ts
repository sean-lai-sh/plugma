import { Request, Response } from "express";
import prisma from "../../config/prisma";
import supabase from "../../config/supabase";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.rpc("create_event", {
        _event_name: "Tech Conference",
        _event_description: "AI and Machine Learning Insights",
        _creator_id: "8d8b4c92-6ef1-4a47-94c2-dfdb13ef9089",
        _approval_required: true,
        _payment_amount: 50.0,
        _payment_currency: "USD",
        _event_date: "2024-09-15T10:00:00Z",
        _end_date: "2024-09-16T18:00:00Z",
        _capacity: 200,
        _location_name: "New York Convention Center",
        _location_address: "123 Main St, NY",
        _location_coordinates: "40.7128,-74.0060",
        _is_virtual: false,
        _virtual_meeting_url: null,
        _is_private: true,
      });
    
      if (error) {
        console.error("Error creating event:", error);
      } else {
        console.log("Event created with ID:", data);
      }
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
