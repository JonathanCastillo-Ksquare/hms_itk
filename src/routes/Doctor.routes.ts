/* Doctor Module - Requirements */

import { Router, Request, Response } from 'express';
import { existDoctor } from '../middlewares/existEntity';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { isAuthorized } from '../middlewares/isAuthorized';
import { getAllDoctorAppointments } from '../repository/Appointments.repo';
import { changeDateById } from '../repository/Doctor.repo';
import { getInfoByOrderedPatientId, getInfoOrderedByDate } from '../repository/Doctor.repo';

export const DoctorRouter = Router();

/*                                      Doctor Module - Requirements
                    5. Only a user with the role of doctor can access these endpoints.     */
// Apply the middlewares to the whole router
DoctorRouter.use(isAuthenticated, isAuthorized({ roles: ['doctor'], allowSameUser: true }), existDoctor)

/*                                      Doctor Module - Requirements
    1. Create an endpoint that reads from the same Model created in the previous model but only returns the appointments assigned to this doctor    */
DoctorRouter.get('/appointments', async (req: Request, res: Response) => {
    const { uid } = res.locals;

    /*                                      Doctor Module - Requirements
                                        4. Create pagination for this resource   */
    const { page = 0, size = 5 } = req.query;

    /*                                      Doctor Module - Requirements
   3. Create filters that allow a doctor to get more specific information like byDate, byPatient, and orderBy=asc|desc.  */
    // Get appointments ordered by date or patient ID ASC | DESC
    if (req.query.orderBy && typeof req.query.orderBy === "string") {
        const query = req.query.orderBy
        const splittedQuery = query.split("-");
        const entity = splittedQuery[0];
        const order = splittedQuery[1];
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            order: String(order),
        }
        // By date
        if (entity === "date") {
            try {
                const appointments = await getInfoOrderedByDate(uid, options);
                return res.status(200).send(appointments);


            } catch (error) {
                return res.status(500).send("Something went wrong");
            }
            // By Patient
        } else if (entity === "patientId") {
            try {
                const appointments = await getInfoByOrderedPatientId(uid, options);
                return res.status(200).send(appointments);


            } catch (error) {
                return res.status(500).send("Something went wrong");
            }

        }


    }
    // Get all appointments of the doctor
    else {
        try {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size)
            }
            const appointments = await getAllDoctorAppointments(uid, options);
            return res.status(200).send(appointments);


        } catch (error) {
            return res.status(500).send("Something went wrong");
        }

    }


})

/*                                      Doctor Module - Requirements
    2. Create an endpoint that allows a doctor to modify the date or time of the appointment and only that.     */
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