import { Router } from "express";
import { fetchCommunityEvents } from "../controllers/analytics/fetchCommunityEvents";
import { getCommID } from "../controllers/analytics/getCommID";
import { allcomms } from "../controllers/analytics/getAllComms";
import { fetchUserCommunityEvents } from "../controllers/analytics/fetchALLEvents";


const router: Router = Router();
router.get("/recentcommunity", fetchCommunityEvents)
router.get("/getcommid", getCommID);
router.get("/getallcomms", allcomms);
router.get("/getallevents", fetchUserCommunityEvents);
router.get('/test_connection', (req, res) => {
    res.send('Hello World!')
    })

export default router;