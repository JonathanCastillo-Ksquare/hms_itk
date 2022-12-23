"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAppointmentsDoctorOrder = exports.getAllAppointmentsPatientOrder = exports.getAllAppointmentsIsDeletedProperty = exports.getAllAppointmentsDoctorById = exports.getAllAppointmentsPatientById = exports.getAllAppointments = exports.createAdmin = void 0;
const firebase_1 = require("../firebase");
const Admin_model_1 = require("../models/Admin.model");
const Appointments_model_1 = require("../models/Appointments.model");
const sequelize_1 = require("sequelize");
const createAdmin = (displayName, email, pswrd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield (0, firebase_1.getAllUsers)();
        let user = userList.find((user) => {
            return user.email === email;
        });
        if (user) {
            console.log("The user already exists");
        }
        else {
            const userId = yield (0, firebase_1.createUser)(displayName, email, pswrd, "admin");
            const admin = Admin_model_1.Admins.create({ user_id: userId });
            return admin;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAdmin = createAdmin;
/* Get all patient appointments */
const getAllAppointments = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
            offset: options.offset,
            limit: options.limit,
            where: {
                id: {
                    [sequelize_1.Op.gt]: 0
                }
            },
            paranoid: false
        });
        return {
            status: "success",
            total: count,
            appointment: rows
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointments = getAllAppointments;
/* Create a filter where you can pass a patientId and only see the appointments of that user  */
const getAllAppointmentsPatientById = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointmentsPatientById = getAllAppointmentsPatientById;
/* Create a filter where you can pass a doctorId and only see the appointments where the doctor is in charge  */
const getAllAppointmentsDoctorById = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointmentsDoctorById = getAllAppointmentsDoctorById;
/* Create a filter where you can receive the information based on is_deleted property */
const getAllAppointmentsIsDeletedProperty = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointmentsIsDeletedProperty = getAllAppointmentsIsDeletedProperty;
/*  Create a filter where you can modify the order of the information do this by the patientId and the doctorId  */
const getAllAppointmentsPatientOrder = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointmentsPatientOrder = getAllAppointmentsPatientOrder;
/*  Create a filter where you can modify the order of the information do this by the patientId and the doctorId  */
const getAllAppointmentsDoctorOrder = (options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllAppointmentsDoctorOrder = getAllAppointmentsDoctorOrder;
