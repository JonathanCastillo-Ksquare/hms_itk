/*                                      Auth Module - Requirements
    3. Create a login endpoint where you need to compare the password via Hashing (you can skip all of this if you wish by using Firebase) and return a session token using JWT   */
// DONE BY USING FIREBASE


import { Router, Request, Response } from "express";
import { createUser, getAllUsers, disableUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createPatient } from "../repository/Patient.repo";

export const AuthRouter = Router();

/*                                      Auth Module - Requirements
    1. Allow a patient to sign up to your system by creating an endpoint without needing to authenticate  */
AuthRouter.post('/signUp', async (req: Request, res: Response) => {

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


/*                                      Auth Module - Requirements
    5. A user can call an endpoint to disable its account (this is a soft-delete operation) is_active = true|false   */
AuthRouter.put('/deleteAccount', isAuthenticated, async (req: Request, res: Response) => {

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

// Route to get all the existen users
AuthRouter.get('/getAll', async (req: Request, res: Response) => {

    try {
        const users = await getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }

})
