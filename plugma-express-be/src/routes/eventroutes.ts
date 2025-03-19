import { Router } from "express";
import { getEvents, createEvent, blastEmail, predictRSVP } from "../controllers/eventController";

const router: Router = Router();

router.get("/", getEvents);
router.post("/create", createEvent);
router.post("/blast", blastEmail);
router.post("/predict", predictRSVP);

export default router;