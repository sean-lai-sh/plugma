import { Router } from "express";
import { fetchCommunityEvents } from "../controllers/analytics/fetchCommunityEvents";
import { getCommID } from "../controllers/analytics/getCommID";


const router: Router = Router();
router.get("/recentcommunity", fetchCommunityEvents)
router.get("/getcommid", getCommID);
export default router;