export class UsersDTO{
    constructor(usuario){
        this.first_name=usuario.nombre, 
        this.email=usuario.correo, 
        this.last_name=usuario.apellido,
        this.role="user", 
        this.username=usuario.correo.split("@")[0]
    }
}

// let user1=new UsersDTO({nombre: "Pedro"})