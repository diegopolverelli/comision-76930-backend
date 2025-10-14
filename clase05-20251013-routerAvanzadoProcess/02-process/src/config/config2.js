import dotenv from "dotenv"

const [,,...argumentos]=process.argv

let MODE="DEV"
let indiceMode=argumentos.findIndex(a=>a=="--mode")
if(indiceMode!=-1){
    MODE=argumentos[indiceMode+1].toLowerCase()
}
// const MODE="DEV"

dotenv.config({
    override:true, 
    quiet: true, 
    path: MODE=="prod"?"./.env.prod":"./.env.dev"
})


export const config={
    PORT:process.env.PORT, 
}