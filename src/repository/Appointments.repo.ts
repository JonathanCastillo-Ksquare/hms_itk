import { Appointments } from "../models/Appointments.model";
import { Doctors } from "../models/Doctors.model";
import { Patients } from "../models/Patients.model";

/* Create Appointment */
export const createAppointment = async (doctor_id: number, patient_id: number, date: Date) => {


    try {
        const newAppointment = await Appointments.create({
            doctor_id,
            patient_id,
            date,
        });

        return newAppointment;
    } catch (error) {
        console.log(error);
    }
}

/* Read an appointment */
export const fetchAppointmentById = async (id: number) => {
    try {
        const foundAppointment = await Appointments.findByPk(id);
        return foundAppointment;
    } catch (error) {
        console.log(error);
        return null;

    }
}

/* Delete an appointment */
export const deleteAppointmentById = async (id: number) => {
    try {
        await Appointments.update({
            status: false
        }, {
            where: {
                id: id
            }
        })
        const deletedAppointment = await Appointments.destroy({
            where: {
                id: id
            }
        })
        return deletedAppointment;
    } catch (error) {
        console.log(error);
        return null;
    }
}



/* Get all patient appointments */
export const getAllPatientAppointments = async (uid: number, options: { limit: number, offset: number }) => {
    const patient = await Patients.findOne({
        where: {
            user_id: uid,
        },
    });
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                patient_id: patient.id,
                status: true
            }
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

/* Get all patient appointments */
export const getAllDoctorAppointments = async (uid: number, options: { limit: number, offset: number }) => {
    const doctor = await Doctors.findOne({
        where: {
            user_id: uid,
        },
    });
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                doctor_id: doctor.id,
                status: true
            }
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