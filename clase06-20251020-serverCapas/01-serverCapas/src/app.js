import express from 'express';
import { router as petsRouter } from './routes/petsRouter.js';
import { router as usersRouter } from './routes/usersRouter.js';

import cors from "cors"

const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(cors())
app.use(cors({
    origin:["https://miempresa.com", "http://127.0.0.1:5500"], 
    // methods: 'POST'
}))

// app.use("/api/pets", cors(), petsRouter)
app.use("/api/pets", petsRouter)
app.use("/api/users", usersRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
