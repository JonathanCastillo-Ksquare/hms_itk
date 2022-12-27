/* Admin Module - Requirements */

import { Router, Request, Response } from "express";
import { getAllUsers, createUser } from "../firebase";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";
import { createDoctor } from "../repository/Doctor.repo";
import { disableUser } from "../firebase";
import { getAllAppointmentsPatientById, getAllAppointmentsDoctorById, getAllAppointmentsIsDeletedProperty, getAllAppointments, getAllAppointmentsPatientOrder, getAllAppointmentsDoctorOrder } from "../repository/Admin.repo";

export const AdminRouter = Router();

// Apply the middlewares to the whole router
AdminRouter.use(isAuthenticated, isAuthorized({ roles: ['admin'], allowSameUser: true }));

/*                                      Admin Module - Requirements
            1. Create an endpoint where an admin can create a new doctor account (user).    */
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

/*                                      Admin Module - Requirements
     2. Create an endpoint that can modify the is_active property from the User model back to true.     */
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

/*                                      Admin Module - Requirements
     3. Create an endpoint that would LIST all the appointments in the table      */
AdminRouter.get('/allAppointments', async (req: Request, res: Response) => {
    /*                                      Admin Module - Requirements
     4. [Appointments] Create pagination filters for the previous endpoint       */
    const { page = 0, size = 5 } = req.query;
    /*                                      Admin Module - Requirements
     5. [Appointments] Create a filter where you can pass a patientId and only see the appointments of that user        */
    if (req.query.patientId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.patientId)
        }
        const appointments = await getAllAppointmentsPatientById(options);
        return res.status(200).send(appointments);
    }
    /*                                      Admin Module - Requirements
     6. [Appointments] Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge         */
    else if (req.query.doctorId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.doctorId)
        }
        const appointments = await getAllAppointmentsDoctorById(options);
        return res.status(200).send(appointments);
    }
    /*                                      Admin Module - Requirements
     7. [Appointments] Create a filter where you can receive the information based on is_deleted property          */
    else if (req.query.appointmentActives) {
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
    }
    /*                                      Admin Module - Requirements
     8. [Appointments] Create a filter where you can modify the order of the information do this by the patientId and the doctorId          */
    else if (req.query.orderBy && typeof req.query.orderBy === "string") {
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
    // Get all appointments
    else {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size)
        }
        const appointments = await getAllAppointments(options);
        return res.status(200).send(appointments);
    }
})