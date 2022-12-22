import { Router, Request, Response } from "express";
import { getAllUsers, createUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createDoctor } from "../repository/Doctor.repo";
import { disableUser } from "../firebase";

export const AdminRouter = Router();

AdminRouter.post('/createDoctor', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
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
        const userId = await createUser(displayName, email, password, 'doctor');
        await createDoctor(userId);
        console.log(userId)
        return res.status(201).send({
            userId: userId,
        })
    } catch (error) {
        return res.status(500).send({ error: 'Something went wrong' });
    }
})

AdminRouter.put('/changeStateAccount/:uid', isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }), async (req: Request, res: Response) => {
    const { uid } = req.params;

    const { disabled } = req.body;

    try {
        const user = await disableUser(uid, disabled);
        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });

    }
})