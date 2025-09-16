import mongoose from "mongoose";

// const clientesSchema=new mongoose.Schema()

export const clientesModelo=mongoose.model(
    "clientes",
    new mongoose.Schema(
        {
            razonSocial: String, 
            cuit: {
                type: String, 
                unique: true, 
            },
            importeCC: {
                type: Number, 
                default: 0
            }
        },
        {
            timestamps: true, 
            // collection: "clientes2019",
            strict: false,
        }
    )
)

// clientesModelo.create({
//     razonSocial:"la casa del pancho", 
//     cuit:"30606066666669", 
//     importeCC: 100, 
//     domicilio: "calle xxxasdf", 
//     categoria: "A"
// })