import mongoose from "mongoose";

export const ticketModel=mongoose.model(
    "ticket", 
    new mongoose.Schema(
        {
            nroTicket: String, 
            fecha: Date, 
            total: Number, 
            detalle: Array
        },
        {
            timestamps:true
        }
    )
)