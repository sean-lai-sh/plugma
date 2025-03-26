import { Router } from "express";
import { fetchCommunityEvents } from "../controllers/analytics/fetchCommunityEvents";
import { getCommID } from "../controllers/analytics/getCommID";
import { allcomms } from "../controllers/analytics/getAllComms";


const router: Router = Router();
router.get("/recentcommunity", fetchCommunityEvents)
router.get("/getcommid", getCommID);
router.get("/getallcomms", allcomms);

export default router;