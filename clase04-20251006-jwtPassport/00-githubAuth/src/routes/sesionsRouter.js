import { Router } from 'express';
import passport from 'passport';
export const router=Router()

router.get("/error", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Error al autenticar`})
})

router.post(
    "/registro", 
    passport.authenticate("registro", {failureRedirect: "/api/sessions/error"}), 
    (req, res)=>{

        // si passport.authenticate sale bien, deja en la req, una 
        // property user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Registro exitoso!`, nuevoUsuario: req.user});
    }
)

router.post(
    "/login", 
    passport.authenticate("login", {failureRedirect: "/api/sessions/error"}), 
    (req, res)=>{

        // si passport.authenticate sale bien, deja en la req, una 
        // property user
        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso!`, datosUsuario: req.user});
    }
)


// paso 3
router.get('/github', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}))
router.get(
    '/callbackGithub', 
    passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), 
    (req, res)=>{

        // si passport.authenticate sale bien, deja en la req, una 
        // property user
        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:`Login exitoso!`, usuario: req.user});
    }
)