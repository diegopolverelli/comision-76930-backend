import express from 'express';
import sessions from "express-session"
import MongoStore from "connect-mongo"
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessions({
    secret: "coderCoder123", 
    resave: true, 
    saveUninitialized: true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        dbName: "comisPruebas", 
        ttl: 60 * 5
    })
}))


app.get('/',(req,res)=>{

    let message=``

    if(req.session.contador){
        req.session.contador+=1
        message=`Hola. Has visitado el site ${req.session.contador} veces`
    }else{
        req.session.contador=1
        message=`Bienvenido`
    }
    

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({message});
})

let usuarios=[
    {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
]

app.get("/login", (req, res)=>{
    let {email, password}=req.query
    let usuario=usuarios.find(u=>u.email==email && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales inválidas`})
    }

    req.session.usuario=usuario   // login

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}`});
})

app.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en proceso de logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso!"});
    })

})


app.get("/datos", auth, (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos", usuarioConectado: req.user });
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});
