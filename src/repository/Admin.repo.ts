import { createUser, getAllUsers } from "../firebase";
import { Admins } from "../models/Admin.model";
import { Appointments } from "../models/Appointments.model";
import { Op } from "sequelize";

export const createAdmin = async (displayName: string, email: string, pswrd: string) => {
    try {

        const userList = await getAllUsers();
        let user = userList.find((user) => {
            return user.email === email
        });

        if (user) {
            console.log("The user already exists")
        } else {
            const userId = await createUser(displayName, email, pswrd, "admin");
            const admin = Admins.create({ user_id: userId })
            return admin;
        }


    } catch (error) {

        console.error(error);

        return null

    }

}

/* Get all patient appointments */
export const getAllAppointments = async (options: { limit: number, offset: number }) => {
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                id: {
                    [Op.gt]: 0
                }
            },
            paranoid: false
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

/* Create a filter where you can pass a patientId and only see the appointments of that user  */
export const getAllAppointmentsPatientById = async (options: { limit: number, offset: number, param: number }) => {
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                patient_id: options.param
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

/* Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge  */
export const getAllAppointmentsDoctorById = async (options: { limit: number, offset: number, param: number }) => {
    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                doctor_id: options.param
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

/* Create a filter where you can receive the information based on is_deleted property */

export const getAllAppointmentsIsDeletedProperty = async (options: { limit: number, offset: number, param: string }) => {

    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                status: options.param
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

/*  Create a filter where you can modify the order of the information do this by the patientId and the doctorId  */
export const getAllAppointmentsPatientOrder = async (options: { limit: number, offset: number, order: string, id: number }) => {

    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                patient_id: options.id
            },
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

/*  Create a filter where you can modify the order of the information do this by the patientId and the doctorId  */
export const getAllAppointmentsDoctorOrder = async (options: { limit: number, offset: number, order: string, id: number }) => {

    try {
        const { count, rows } = await Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                doctor_id: options.id
            },
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





