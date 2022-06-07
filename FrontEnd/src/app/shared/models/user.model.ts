import { UserRole } from "../enums/userRoles";


export interface User {
    idUser: number,
    firstName: string,
    lastName: string,
    email: string,
    role : UserRole ,
    token: string
}