import { Request, Response } from "express";
import * as admin from "firebase-admin";

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: Function
) => {
    // los JWT viajan en un header llamado Authorization, tiene un schema y unos parametros, en especial el Bearer, aqui se pasa el token, el header tiene que tener authorization, sino existe no mandaron el token y no estan autorizados
    //No authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'No auth' });
    }
    //No correct scheme(Bearer)
    if (!authorization.startsWith("Bearer")) {
        return res.status(401).send({ error: 'No auth' });
    }
    //Check if the token is valid
    const splittedtoken = authorization.split("Bearer ");
    if (splittedtoken.length !== 2) {
        return res.status(401).send({ error: 'No auth' });
    }

    //Verify if firebase detects the token because we did not create this token, firebase made the token

    const token = splittedtoken[1];

    try {
        const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
        res.locals = {
            ...res.locals,
            email: decodedToken.email,
            uid: decodedToken.uid,
            role: decodedToken.role
        }

        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'No authori' })
    }
    // si todo esto pasa nuestro usuairo esta correctamente autenticado y tiene derecho a acceder a los recursos
}