import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);

export default app;
