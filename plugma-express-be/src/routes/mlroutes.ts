import { Router } from "express";
import { predictRSVP } from "../controllers/mlController";

const router: Router = Router();

router.post("/predict-rsvp", predictRSVP);

export default router;
