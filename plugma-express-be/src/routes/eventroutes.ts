import { Router } from "express";
import { getEvents, createEventController, blastEmail, predictRSVP } from "../controllers/eventController";

const router: Router = Router();

router.get("/", getEvents);
router.post("/create", createEventController);
router.post("/blast", blastEmail);
router.post("/predict", predictRSVP);

export default router;