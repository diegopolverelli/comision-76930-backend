import dotenv from "dotenv"

dotenv.config({path:"./.env", override:true, quiet: true})


export const config={
    database:{
        MONGO_URL: process.env.MONGO_URL, 
        DB_NAME: process.env.DB_NAME, 
    }, 
    general: {
        PORT:process.env.PORT, 
        SECRET: process.env.SECRET
    },
}