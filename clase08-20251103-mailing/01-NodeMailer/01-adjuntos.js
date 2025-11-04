import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport(
    {
        service: "gmail", 
        port: 587, 
        auth:{
            user: "diegopolverelli@gmail.com",
            pass: "contraseña de app de gmail",
        }
    }
)

const enviarMail=()=>{
    return transporter.sendMail({
        from: "Diego Polverelli diegopolverelli@gmail.com",
        to: "diegopolverelli@hotmail.com, diepol@yahoo.com", 
        subject: "Prueba mail adjuntos...",
        // text: "prueba...",
        html: `<h2 style="color:red;">Prueba mensaje con adjuntos</h2>
<br>
<p>Prueba de mail adjuntos...!!!</p>
        `,
        attachments: [
            {
                path: "./images/diego10.jpg", 
                filename: "Diego01.jpg",
            },
            {
                path: "./images/lio.jpg", 
                filename: "lio01.jpg",
            },
            {
                path: "./images/lio2.jpg", 
                filename: "lio02.jpg",
            },
        ]
    })
}

let response=await enviarMail()
if(response.rejected.length>0){
    console.log(`Error en el envío del mail`)
}else{
    console.log("Mail enviado con éxito...!!!")
}