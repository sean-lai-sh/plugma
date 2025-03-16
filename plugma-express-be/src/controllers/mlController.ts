import { Request, Response } from "express";
import axios from "axios";

const FASTAPI_URL = "http://localhost:8000"; // FastAPI ML service URL

export const predictRSVP = async (req: Request, res: Response) => {
  try {
    // Send event/user data to FastAPI ML model
    const response = await axios.post(`${FASTAPI_URL}/predict`, {
      features: req.body.features, // Example: [yearsOfExperience, age, GPA]
    });

    // Return prediction from FastAPI
    res.json({ prediction: response.data.prediction });
  } catch (error) {
    console.error("Error calling FastAPI ML service:", error);
    res.status(500).json({ error: "ML Service Unavailable" });
  }
};
