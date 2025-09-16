// const express=require("express")
import express from "express"

const PORT=3000
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res)=>{  // funcion handler o controller

    res.send({message:"Home Page...!!!", status:"OK"})
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})