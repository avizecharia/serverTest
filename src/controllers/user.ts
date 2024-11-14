import { Router } from "express"
import { getUserRoute, loginRoute, registerRoute } from "../routes/userRoute"
//loginRoute
const router = Router()

router.post("/login" , loginRoute)
router.post("/register" ,registerRoute)
router.get("/getUser/:id",getUserRoute)


export default router