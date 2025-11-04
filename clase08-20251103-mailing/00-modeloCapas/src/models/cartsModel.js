import mongoose from "mongoose"

export const cartModel = mongoose.model(
    "carts",
    new mongoose.Schema({
        products: {
            type: [
                {
                    productID: {
                        type: mongoose.Types.ObjectId,
                        ref: "products"
                    },
                    quantity: Number
                }
            ]
        }
    },
        {
            timestamps: true
        }
    )
)