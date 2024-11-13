import { Router } from "express"
import { registerRoute } from "../routes/userRoute"
//loginRoute
const router = Router()

// router.post("/login" , loginRoute)
router.post("/register" ,registerRoute)


export default router