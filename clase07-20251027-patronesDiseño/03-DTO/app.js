import { UsersDTO } from "./dto/usersDTO.js"

const userBody={
    nombre: "Juan",
    correo: "jperez@test.com", 
    apellido: "Perez", 
}
console.log(userBody)

// let name=userBody.nombre

let user=new UsersDTO(userBody)

console.log(user)