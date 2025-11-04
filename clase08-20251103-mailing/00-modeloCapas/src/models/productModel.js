import mongoose from "mongoose"
export const productosModelo=mongoose.model(
    "products", 
    new mongoose.Schema(
        {
            title: String,
            price: Number, 
            stock: Number
        }, 
        {
            timestamps: true, 
            collection: "productsComis76930",
        }
    )
)