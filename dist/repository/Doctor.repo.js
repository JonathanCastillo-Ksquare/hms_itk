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
exports.getInfoByOrderedPatientId = exports.getInfoOrderedByDate = exports.changeDateById = exports.createDoctor = void 0;
const Appointments_model_1 = require("../models/Appointments.model");
const Doctors_model_1 = require("../models/Doctors.model");
const createDoctor = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctor = yield Doctors_model_1.Doctors.create({
            user_id,
        });
        return doctor;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDoctor = createDoctor;
const changeDateById = (appointment_id, newDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorAppointment = yield Appointments_model_1.Appointments.update({
            date: newDate
        }, {
            where: {
                id: appointment_id
            }
        });
        return doctorAppointment;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.changeDateById = changeDateById;
const getInfoOrderedByDate = (uid, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
            include: {
                model: Doctors_model_1.Doctors,
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getInfoOrderedByDate = getInfoOrderedByDate;
const getInfoByOrderedPatientId = (uid, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { count, rows } = yield Appointments_model_1.Appointments.findAndCountAll({
            include: {
                model: Doctors_model_1.Doctors,
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
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getInfoByOrderedPatientId = getInfoByOrderedPatientId;
