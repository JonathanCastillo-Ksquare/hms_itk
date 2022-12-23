import { Router, Request, Response } from "express";
import { getAllUsers, createUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createDoctor } from "../repository/Doctor.repo";
import { disableUser } from "../firebase";
import { getAllAppointmentsPatientById, getAllAppointmentsDoctorById, getAllAppointmentsIsDeletedProperty, getAllAppointments, getAllAppointmentsPatientOrder, getAllAppointmentsDoctorOrder } from "../repository/Admin.repo";

export const AdminRouter = Router();

AdminRouter.use(isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }));

AdminRouter.post('/createDoctor', async (req: Request, res: Response) => {
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

/* Route to get all appointmenta of the patient */
AdminRouter.get('/allAppointments', async (req: Request, res: Response) => {
    // Pagination
    const { page = 0, size = 5 } = req.query;
    if (req.query.patientId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.patientId)
        }
        const appointments = await getAllAppointmentsPatientById(options);
        return res.status(200).send(appointments);
    } else if (req.query.doctorId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.doctorId)
        }
        const appointments = await getAllAppointmentsDoctorById(options);
        return res.status(200).send(appointments);
    } else if (req.query.appointmentActives) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: String(req.query.appointmentActives)
        }
        if (options.param === "true" || options.param === "false") {
            const appointments = await getAllAppointmentsIsDeletedProperty(options);
            return res.status(200).send(appointments);
        } else {
            return res.status(500).send("No valid query");
        }
    } else if (req.query.orderBy && typeof req.query.orderBy === "string") {
        const query = req.query.orderBy
        const splittedQuery = query.split("-");
        const entity = splittedQuery[0];
        const entity_id = splittedQuery[1];
        const order = splittedQuery[2];
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            order: String(order),
            id: Number(entity_id)
        }
        if (entity === "patient") {
            const appointments = await getAllAppointmentsPatientOrder(options);
            return res.status(200).send(appointments);

        } else if (entity === "doctor") {
            const appointments = await getAllAppointmentsDoctorOrder(options);
            return res.status(200).send(appointments);
        }

    }
    else {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size)
        }
        const appointments = await getAllAppointments(options);
        return res.status(200).send(appointments);
    }
})