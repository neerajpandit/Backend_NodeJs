import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { dataPagination } from "../controllers/data.pagination.js";
import { seedPersons } from "../controllers/Generatefakedata.js";
import { getPersons } from "../controllers/person.controller.js";
const router = Router()

router.route("/signup").post(registerUser)
router.route("/signin").post(loginUser)
router.route("/pagination").get(dataPagination)
router.route("/generate").post(seedPersons)
router.route("/getPerson").get(getPersons)

export default router;