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
exports.PatientRouter = void 0;
const express_1 = require("express");
const Appointments_repo_1 = require("../repository/Appointments.repo");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const existEntity_1 = require("../middlewares/existEntity");
exports.PatientRouter = (0, express_1.Router)();
exports.PatientRouter.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['patient'], allowSameUser: true }), existEntity_1.existPatient);
/* Route to create a new appointment */
exports.PatientRouter.post('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctor_id, date } = req.body;
    const { patient_id } = res.locals;
    if (!doctor_id) {
        res.status(400);
        return res.send({
            message: 'Missing doc'
        });
    }
    if (!patient_id) {
        res.status(400);
        return res.send({
            message: 'Missing patient'
        });
    }
    if (!date) {
        res.status(400);
        return res.send({
            message: 'Missing date'
        });
    }
    const newAppointment = yield (0, Appointments_repo_1.createAppointment)(doctor_id, patient_id, date);
    res.status(201);
    return res.send({
        newAppointment
    });
}));
/* Route to get an appointment */
exports.PatientRouter.get('/appointments/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    if (appointmentId <= 0) {
        res.status(400);
        return res.send({
            error: 'Invalid id'
        });
    }
    const foundAppointment = yield (0, Appointments_repo_1.fetchAppointmentById)(appointmentId);
    if (!foundAppointment) {
        res.status(400);
        return res.send({
            error: 'Appointment not found'
        });
    }
    return res.send({
        Appointmentid: foundAppointment.id,
        doctorId: foundAppointment.doctor_id,
        patientId: foundAppointment.patient_id,
        date: foundAppointment.date,
        status: foundAppointment.status
    });
}));
/* Route to get all appointmenta of the patient */
exports.PatientRouter.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = res.locals;
    // Pagination
    const { page = 0, size = 5 } = req.query;
    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    };
    try {
        const appointments = yield (0, Appointments_repo_1.getAllPatientAppointments)(uid, options);
        return res.status(200).send(appointments);
    }
    catch (error) {
        return res.status(500).send("Something went wrong");
    }
}));
/* Route to delete an appointment */
exports.PatientRouter.put('/appointments/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    try {
        yield (0, Appointments_repo_1.deleteAppointmentById)(appointmentId);
        return res.status(200).send({ sucess: "Appointment deleted!" });
    }
    catch (error) {
        return res.status(500).send("Something went wrong");
    }
}));
