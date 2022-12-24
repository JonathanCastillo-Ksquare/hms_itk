import { Appointments } from "../models/Appointments.model";
import { Doctors } from "../models/Doctors.model";

export const createDoctor = async (user_id: string) => {

    try {

        const doctor = await Doctors.create({

            user_id,
        })

        return doctor;

    } catch (error) {

        console.error(error);

        return null

    }

}

export const changeDateById = async (appointment_id: number, newDate: Date) => {
    try {
        const doctorAppointment = await Appointments.update({
            date: newDate
        }, {
            where: {
                id: appointment_id
            }
        });
        return doctorAppointment
    } catch (error) {
        console.error(error);

        return null
    }
}