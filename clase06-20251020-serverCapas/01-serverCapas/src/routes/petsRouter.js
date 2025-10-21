import { Router } from "express"
import { PetsController } from "../controller/pets.controller.js"

export const router = Router()

// router.get("/", (req, res)=>{...})
router.get(
    "/",
    (req, res, next) => {

        console.log(`Middleware 1...!!!`)
        next()
    },
    PetsController.getPets
)


router.post("/", PetsController.createPet)