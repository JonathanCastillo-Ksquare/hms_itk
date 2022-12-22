import { Router, Request, Response } from "express";
import { createUser, readUser, getAllUsers, updateUser, disableUser, getUserByEmail } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import * as admin from "firebase-admin";
import { createPatient } from "../repository/Patient.repo";

export const AuthRouter = Router();

//Si quiero que todas mis rutas esten protegidas puedo poner el middleware a nivel del router
//UserRoutees.use(isAuthenticated)

AuthRouter.post('/signUp', async (req: Request, res: Response) => {
    //Info desde el body
    //Checar si falta info
    //Checar que el rol sea adecuado
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }

    const users = await getAllUsers();

    let user = users.find((user) => {
        return user.email === email
    });

    if (user) {
        res.status(400).json({ error: "El email ya existe" });
    }

    try {
        const userId = await createUser(displayName, email, password, 'patient');
        await createPatient(userId);
        console.log(userId)
        return res.status(201).send({
            userId: userId,
        })
    } catch (error) {
        return res.status(500).send({ error: 'Something went wrong' });
    }
})

AuthRouter.put('/deleteAccount', isAuthenticated, async (req: Request, res: Response) => {
    // Dos formas de obtener el userId
    //1ra forma
    // const { userId } = req.params;
    //2da forma
    const { uid } = res.locals;

    const { disabled } = req.body;

    try {
        const user = await disableUser(uid, disabled);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }

})

AuthRouter.get('/getAll', async (req: Request, res: Response) => {

    try {
        const users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }

})

AuthRouter.post('/logIn', async (req: Request, res: Response) => {
    const { email, passwrd } = req.body;

    const users = await getAllUsers();

    let user = users.find((user) => {
        return user.email === email
    })

    if (!user) {
        return res.status(400).json({ error: "Invalid crendetials" });
    }
    const uid = user?.uid

    try {
        const additionalClaims = {
            premiumAccount: true,
        };

        admin.auth()
            .createCustomToken(uid, additionalClaims)
            .then((customToken) => {
                return res.status(201).send({
                    token: customToken,
                    user: user
                })
            })
            .catch((error) => {
                console.log('Error creating custom token:', error);
            });


    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }

})

