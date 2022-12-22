//Uno es de autenticacion, tienes el token que te identifica como usuario registrado

//Hay diferentes permisos porque hay diferentes roles
import { Request, Response } from "express";
import { Role } from "../firebase";

//Sirva como middleware
//Nos deje configurar  que roles tienen acceso a un endpoint
//Nos debe de dejar sobreeescribir el permiso si el mismo usuario dueño del recurso quiere accederlo a pesar de no tener permisos

//USAMOS UN CLOUSURE
export const isAuthorized = (options: { roles: Role[]; allowSameUser: Boolean }) => {
    return (req: Request, res: Response, next: Function) => {
        const { uid, email, role } = res.locals;
        const { userId } = req.params;

        if (email === 'superUser1@super.com') {
            return next();
        }

        if (options.allowSameUser && userId && userId === uid) {
            return next();
        }

        if (!role) {
            return res.status(403).send("No role was asigned");
        }

        if (options.roles.includes(role)) {
            return next();
        }

        return res.status(403).send("Role no authorized");
    }
}