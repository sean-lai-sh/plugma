import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventroutes";
import mlRoutes from "./routes/mlroutes";
import analyticsRoutes from "./routes/analyticsroutes";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());


app.use("/api/ml", mlRoutes);
app.use("/api/ds", analyticsRoutes);
app.use("/api/events", eventRoutes);

export default app;
