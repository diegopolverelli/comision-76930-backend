import { Router } from 'express';
import { UsuariosManagerMongo } from '../dao/UsuariosManagerMONGO.js';
import { generaHash, validaPass } from '../utils.js';
import passport from 'passport';
export const router=Router()

// router.post('/register',async(req,res)=>{
//     let {nombre, email, password}=req.body
//     // validaciones
//     if(!nombre || !email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`nombre email password son requeridos`})
//     }

//     try {

//         password=generaHash(password)

//         let nuevoUsuario=await UsuariosManagerMongo.create({nombre, email, password})
        
//         res.setHeader('Content-Type','application/json')
//         res.status(200).json({message:`Registro exitoso`, nuevoUsuario})
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }
    

// })

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(400).json({error:`Error de autenticación`})
})

router.post(
    "/register", 
    // paso 3
    passport.authenticate("registro", {failureRedirect: "/api/sessions/error"}),
    (req, res)=>{

        // si sale OK el passport.authenticate
        // passport deja en la req, una property user, con los
        // datos del usuario

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Registro exitoso para ${req.user.nombre}`, nuevoUsuario: req.user});
    }
)

// router.post("/login", async(req, res)=>{
//     let {email, password, web}=req.body
//     if(!email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`email | password son requeridos`})
//     }

//     try {
//         let usuario=await UsuariosManagerMongo.getBy({email})
//         if(!usuario){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }

//         if(!validaPass(password, usuario.password)){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Credenciales inválidas`})
//         }

//         delete usuario.password
//         req.session.usuario=usuario

//         if(web){
//             return res.redirect("/perfil")
//         }else{
//             res.setHeader('Content-Type','application/json');
//             return res.status(200).json({payload:`Login exitoso para ${usuario.nombre}...!!!`});
//         }

//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal Server Error`})
//     }
// })

router.post(
    "/login", 
    passport.authenticate("login", {failureRedirect:"/api/sessions/error"}),
    (req, res)=>{

        // si sale OK el passport.authenticate
        // passport deja en la req, una property user, con los
        // datos del usuario
        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso para ${req.user.nombre}`});
    }
)

router.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error en proceso de logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout exitoso!"});
    })
})