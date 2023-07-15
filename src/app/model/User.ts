import { Role } from "./Role";

export interface User{
    idUser:number;
    username:String;
    password:String;
    name:String;
    email:string;
    dni:string;
    profile:String;
    roles: Role[];
}
