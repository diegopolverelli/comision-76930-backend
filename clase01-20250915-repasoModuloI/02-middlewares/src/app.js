// const express=require("express")
import express from "express"
import { logger } from "./middlewares/logger.js"
import { auth } from "./middlewares/auth.js"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(logger)

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