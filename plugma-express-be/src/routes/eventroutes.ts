import { Router } from "express";
import { createEventController, blastEmail, predictRSVP } from "../controllers/eventController";
import { eventPageFetch } from "../controllers/events/eventPageFetch";
import { manageEvent } from "../controllers/events/manageEvent";

const router: Router = Router();
router.get('/manageEvent', manageEvent);
router.get("/getEvent/:slug", eventPageFetch);
router.post("/create", createEventController);
router.post("/blast", blastEmail);
router.post("/predict", predictRSVP);

export default router;