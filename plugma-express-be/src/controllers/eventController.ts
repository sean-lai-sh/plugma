import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import queue from "../config/redis";
import axios from "axios";

const prisma = new PrismaClient();

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const events = await prisma.event.findMany();
  res.json(events);
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const { title, description, date, location } = req.body;
  const event = await prisma.event.create({
    data: { title, description, date: new Date(date), location },
  });
  res.status(201).json(event);
};

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
