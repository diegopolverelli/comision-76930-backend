import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import { usuariosModelo } from "../models/usuario.model.js"

export const iniciarPassport = () => {

    // paso 1
    passport.use("github", new github.Strategy(
        {
            clientID: "Iv23liiSfWnLpJvZY6s6",
            clientSecret: "18d2275b952f6adda00f6445ec69fd9f40a88446",
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub"
        },
        async (t1, t2, profile, done) => {
            try {
                // console.log(profile)
                let { name, email } = profile._json
                if (!email) {
                    return done(null, false)
                }
                let usuario = await usuariosModelo.findOne({ email })
                if (!usuario) {
                    usuario = await usuariosModelo.create({
                        email, 
                        nombre: name, 
                        profile
                    })

                }

                console.log(usuario)
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // paso 1'  (solo si sessions...)
    passport.serializeUser((usuario, done) => {
        return done(null, usuario.email)
    })

    passport.deserializeUser(async (email, done) => {
        let usuario = await usuariosModelo.findOne({ email })
        return done(null, usuario)
    })


}