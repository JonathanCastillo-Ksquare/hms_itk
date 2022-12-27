/* Repository to create the functions to manipulate doctor stuff */

import { Appointments } from "../models/Appointments.model";
import { Doctors } from "../models/Doctors.model";

// Function to create a new Doctor
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

// Function to let a doctor to change any date
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

// Function to let a doctor to get the information ordered by date ASC | DESC
export const getInfoOrderedByDate = async (uid: string, options: { limit: number, offset: number, order: string }) => {
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            include: {
                model: Doctors,
                attributes: ["id"],
                where: {
                    user_id: uid
                }
            },
            attributes: ["id", "date", "status", "patient_id"],
            offset: options.offset,
            limit: options.limit,
            order: [['createdAt', options.order]]
        });
        return {
            status: "success",
            total: count,
            appointment: rows
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Function to let a doctor to get the information ordered by patient id ASC | DESC
export const getInfoByOrderedPatientId = async (uid: string, options: { limit: number, offset: number, order: string }) => {
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            include: {
                model: Doctors,
                attributes: ["id"],
                where: {
                    user_id: uid
                }
            },
            attributes: ["id", "date", "status", "patient_id"],
            offset: options.offset,
            limit: options.limit,
            order: [['id', options.order]]
        });
        return {
            status: "success",
            total: count,
            appointment: rows
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}