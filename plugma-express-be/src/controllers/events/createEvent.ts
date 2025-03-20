import { Request, Response } from "express";
import prisma from "../../config/prisma";
import supabase from "../../config/supabase";
import axios from "axios";

type createEventType = {
  eventTitle : string,
  eventDescription: string,
  creatorID: string, // get this from supabase
  eventDate: Date, // we will check on express middleware if this is a valid date
  eventEndDate: Date,
  eventTags: string,
  eventPrivate: boolean,
  eventReqApproval: boolean,
  eventLocationName: string,
  eventLocationAddress: string,
  virtualMeetingURL: string,
  paymentAmount: number,
  paymentCurrency: string,
  updatedAt: Date,
  createdAt: Date,
  capacity: number | undefined, // Due to impl of DB to be udefined which becomes NULL as inf capacity
}

export const createEvent = async (req: Request, res: Response) => {
  try {

    /// Format the data from the request body

    const newEvent :createEventType= req.body;

    const encodedAddr = encodeURIComponent(newEvent.eventLocationAddress);

    const responseURL = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedAddr}&apiKey=${process.env.HERE_LOCATION_API_KEY}`;
  
    const locationResponse = await axios.get(responseURL);
    let coordinates : string | null = null;
    // Concat into a formatted string (on fe use split(' ') to get lat and long)
    if(locationResponse.data.items.length > 0) {
      coordinates = `${locationResponse.data.items[0].position.lat} ${locationResponse.data.items[0].position.lng}`;
    }
    const { data, error } = await supabase.rpc("create_event", {
        _event_name: newEvent.eventTitle,
        _event_description: newEvent.eventDescription,
        _creator_id: newEvent.creatorID,
        _approval_required: newEvent.eventReqApproval,
        _payment_amount: newEvent.paymentAmount,
        _payment_currency: newEvent.paymentCurrency,
        _event_date: newEvent.eventDate,
        _end_date: newEvent.eventEndDate,
        _capacity: newEvent.capacity,
        _location_name: newEvent.eventLocationName,
        _location_address: newEvent.eventLocationAddress,
        _location_coordinates: coordinates,
        _is_virtual: newEvent.virtualMeetingURL ? true : false,
        _virtual_meeting_url: newEvent.virtualMeetingURL,
        _is_private: newEvent.eventPrivate,
      });
    
      if (error) {
        console.error("Error creating event:", error);
      } else {
        console.log("Event created with ID:", data);
      }
    res.status(200).json({ message: "Event created successfully, redirect link here", data });

  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
