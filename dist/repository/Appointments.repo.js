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
exports.getAllPatientAppointments = exports.deleteAppointmentById = exports.fetchAppointmentById = exports.createAppointment = void 0;
const Appointments_model_1 = require("../models/Appointments.model");
const Patients_model_1 = require("../models/Patients.model");
/* Create Appointment */
const createAppointment = (doctor_id, patient_id, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAppointment = yield Appointments_model_1.Appointments.create({
            doctor_id,
            patient_id,
            date,
        });
        return newAppointment;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAppointment = createAppointment;
/* Read an appointment */
const fetchAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAppointment = yield Appointments_model_1.Appointments.findByPk(id);
        return foundAppointment;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.fetchAppointmentById = fetchAppointmentById;
/* Delete an appointment */
const deleteAppointmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Appointments_model_1.Appointments.update({
            status: false
        }, {
            where: {
                id: id
            }
        });
        const deletedAppointment = yield Appointments_model_1.Appointments.destroy({
            where: {
                id: id
            }
        });
        return deletedAppointment;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.deleteAppointmentById = deleteAppointmentById;
/* Get all patient appointments */
const getAllPatientAppointments = (uid, options) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield Patients_model_1.Patients.findOne({
        where: {
            user_id: uid,
        },
    });
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getAllPatientAppointments = getAllPatientAppointments;
