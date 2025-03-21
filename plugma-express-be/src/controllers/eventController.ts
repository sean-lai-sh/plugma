import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import queue from "../config/redis";
import axios from "axios";
import {createEvent} from "./events/createEvent";
import supabase from "../config/supabase";

const prisma = new PrismaClient();

export const createEventController = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await createEvent(req, res);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
}

export const blastEmail = async (req: Request, res: Response): Promise<void> => {
  const { subject, message, recipients } = req.body;
  await queue.add({ subject, message, recipients });
  res.json({ success: true, message: "Emails queued for sending!" });
};

export const predictRSVP = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.post("http://localhost:8000/predict", {
      features: req.body.features
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "ML Service Unavailable" });
  }
};
