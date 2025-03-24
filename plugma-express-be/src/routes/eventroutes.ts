import { Router } from "express";
import { createEventController, blastEmail, predictRSVP } from "../controllers/eventController";
import { eventPageFetch } from "../controllers/events/eventPageFetch";
import { manageEvent } from "../controllers/events/manageEvent";
import { checkAttendance } from "../controllers/events/checkAttendee";
import { add_attendee } from "../controllers/events/add_attendeee";
import { add_attendee_signed } from "../controllers/events/add_attendee_signed";
import { cancel_attendee } from "../controllers/events/cancel_attendee";
import { update_attendee } from "../controllers/events/update_attendee";

const router: Router = Router();
router.get('/manageEvent', manageEvent);
router.get("/add_attendee", add_attendee);
router.get("/add_attendee_signed", add_attendee_signed);
router.get("/getEvent/:slug", eventPageFetch);
router.get("/checkattendee", checkAttendance);
router.get('/cancel_attendee', cancel_attendee);
router.get('/update_attendee', update_attendee);
router.post("/create", createEventController);
router.post("/blast", blastEmail);
router.post("/predict", predictRSVP);

export default router;