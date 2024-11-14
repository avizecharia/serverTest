import { Router } from "express"
import { changeStatus, createLaunchRoute, getYourDeffenceAttackRoute, grtYourLauncheRoute } from "../routes/launchRoute"
//loginRoute
const router = Router()


router.post("/launch" ,createLaunchRoute)
router.post("/status/:id" ,changeStatus)
router.get("/getYourLaunche/:id" ,grtYourLauncheRoute)
router.get("/getDefenceAttack/:area" ,getYourDeffenceAttackRoute)


export default router