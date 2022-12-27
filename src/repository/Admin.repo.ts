/* Repository to create the functions to manipulate admin stuff */

import { createUser, getAllUsers } from "../firebase";
import { Admins } from "../models/Admin.model";
import { Appointments } from "../models/Appointments.model";
import { Op } from "sequelize";

// Function to create an admin by passing the minimun parameters needed to be created
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

// Function to get all appointments of all patients
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

// Function to get all the appointments of a given id
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

// Function to get all appointments of a given doctor
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


// Function to get all apppintments according to the "isDeleted" property
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

// Function to get all appointments of a given patient ID and order them ASC | DESC
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

// Function to get all appointments of a given doctor ID and order them ASC | DESC
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





