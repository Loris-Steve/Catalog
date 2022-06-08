import { UserRole } from "../enums/userRoles.enum";


export interface User {
    idUser: number,
    firstName: string,
    lastName: string,
    email: string,
    role : UserRole ,
    token: string
}