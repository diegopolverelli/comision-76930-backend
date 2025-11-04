//qhlz cath elqn ozmj
import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth: {
            user: "diegopolverelli@gmail.com",
            pass: "contraseña de app de gmail", 
        }
    }
)

const enviarMail=()=>{
    return transporter.sendMail(
        {
            from: "Diego diegopolverelli@gmail.com", 
            to: "diegopolverelli@hotmail.com, diepol@yahoo.com", 
            subject: "Prueba mail simple...",
            // text: "prueba...",
            html: `<h2 style="color:red;">Prueba mensaje simple</h2>
<br>
<p>Prueba de mail simple...!!!</p>
            `
        }
    )
}

let response=await enviarMail()
// console.log(JSON.stringify(response, null, 5))
if(response.rejected.length>0){
    console.log(`Error al enviar mensaje... :(`)
}else{
    console.log(`Mail enviado...!!!`)
}

