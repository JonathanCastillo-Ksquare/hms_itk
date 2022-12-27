/*  */

import { Router, Request, Response } from 'express';
import { createAppointment, fetchAppointmentById, deleteAppointmentById, getAllPatientAppointments } from '../repository/Appointments.repo';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import { existPatient } from '../middlewares/existEntity';

export const PatientRouter = Router();

/*                                      Patient Module - Requirements
                    4. Only a user with the role of patient can access these endpoints.    */
// Apply the middlewares to the whole router
PatientRouter.use(isAuthenticated, isAuthorized({ roles: ['patient'], allowSameUser: true }), existPatient)

/*                                      Patient Module - Requirements
    1. Create a series of endpoints that need to LIST, Read, Create and Delete appointments   */

/* Create */
PatientRouter.post('/appointments', async (req: Request, res: Response) => {
    const { doctor_id, date } = req.body;
    const { patient_id } = res.locals;


    if (!doctor_id) {
        res.status(400);
        return res.send({
            message: 'Missing doc'
        })
    }

    if (!patient_id) {
        res.status(400);
        return res.send({
            message: 'Missing patient'
        })
    }

    if (!date) {
        res.status(400);
        return res.send({
            message: 'Missing date'
        })
    }

    const newAppointment = await createAppointment(doctor_id, patient_id, date);

    res.status(201);
    return res.send({
        newAppointment
    })
})

/* Read */
PatientRouter.get('/appointments/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);

    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        })
    }

    const foundAppointment = await fetchAppointmentById(appointmentId);

    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found'
        })
    }

    return res.send({
        Appointmentid: foundAppointment.id,
        doctorId: foundAppointment.doctor_id,
        patientId: foundAppointment.patient_id,
        date: foundAppointment.date,
        status: foundAppointment.status

    })
})


/* List */
PatientRouter.get('/appointments', async (req: Request, res: Response) => {
    const { uid } = res.locals;

    /*                                      Patient Module - Requirements
                                        2. Create pagination for this resource   */
    const { page = 0, size = 5 } = req.query;

    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    }



    try {
        const appointments = await getAllPatientAppointments(uid, options);
        return res.status(200).send(appointments);


    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})


/* Delete */
/*                                      Patient Module - Requirements
                3. Soft delete was done by using the paranoid options as true in the appointments model   */
PatientRouter.put('/appointments/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);

    try {
        await deleteAppointmentById(appointmentId);
        return res.status(200).send({ sucess: "Appointment deleted!" });
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})