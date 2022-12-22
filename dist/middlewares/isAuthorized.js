"use strict";
//Uno es de autenticacion, tienes el token que te identifica como usuario registrado
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
//Sirva como middleware
//Nos deje configurar  que roles tienen acceso a un endpoint
//Nos debe de dejar sobreeescribir el permiso si el mismo usuario dueño del recurso quiere accederlo a pesar de no tener permisos
//USAMOS UN CLOUSURE
const isAuthorized = (options) => {
    return (req, res, next) => {
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
    };
};
exports.isAuthorized = isAuthorized;
