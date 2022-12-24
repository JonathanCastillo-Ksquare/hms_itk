import { Router, Request, Response } from 'express';
import { existDoctor } from '../middlewares/existEntity';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import { getAllDoctorAppointments } from '../repository/Appointments.repo';
import { changeDateById } from '../repository/Doctor.repo';

export const DoctorRouter = Router();

DoctorRouter.use(isAuthenticated, isAuthorized({ roles: ['doctor'], allowSameUser: true }), existDoctor)

/* Route to get all appointmenta of the patient */
DoctorRouter.get('/appointments', async (req: Request, res: Response) => {
    const { uid } = res.locals;

    // Pagination
    const { page = 0, size = 5 } = req.query;

    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    }



    try {
        const appointments = await getAllDoctorAppointments(uid, options);
        return res.status(200).send(appointments);


    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})

/* Route to delete an appointment */
DoctorRouter.put('/appointments/:appointmentId', async (req: Request, res: Response) => {
    const appointmentId = Number(req.params['appointmentId']);
    const { newDate } = req.body;

    try {
        await changeDateById(appointmentId, newDate);
        return res.status(200).send({ sucess: "Date updated successfully!" });
    } catch (error) {
        return res.status(500).send("Something went wrong");
    }
})