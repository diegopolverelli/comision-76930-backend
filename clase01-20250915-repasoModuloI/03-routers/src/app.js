// const express=require("express")
import express from "express"
import { logger } from "./middlewares/logger.js"
import { auth } from "./middlewares/auth.js"

import { router as productsRouter } from "./routes/productsRouter.js"
import { router as clientesRouter } from "./routes/clientesRouter.js"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(logger)

app.use("/api/products", productsRouter)
app.use("/api/clients", clientesRouter)

app.get("/", (req, res) => {  // funcion handler o controller

    res.send({ message: "Home Page...!!!", status: "OK" })
})

app.get(
    "/datos",
    (req, res, next)=>{
        console.log(`Middleware II, solo datos`)
        next()
    },
    auth,
    (req, res) => {  // funcion handler o controller

        res.send({ message: "datos...!!!", status: "OK", user: req.user })
    }
)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})