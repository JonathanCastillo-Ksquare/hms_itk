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
exports.DoctorRouter = void 0;
const express_1 = require("express");
const existEntity_1 = require("../middlewares/existEntity");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Appointments_repo_1 = require("../repository/Appointments.repo");
const Doctor_repo_1 = require("../repository/Doctor.repo");
exports.DoctorRouter = (0, express_1.Router)();
exports.DoctorRouter.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['doctor'], allowSameUser: true }), existEntity_1.existDoctor);
/* Route to get all appointmenta of the patient */
exports.DoctorRouter.get('/appointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = res.locals;
    // Pagination
    const { page = 0, size = 5 } = req.query;
    let options = {
        limit: Number(size),
        offset: Number(page) * Number(size)
    };
    try {
        const appointments = yield (0, Appointments_repo_1.getAllDoctorAppointments)(uid, options);
        return res.status(200).send(appointments);
    }
    catch (error) {
        return res.status(500).send("Something went wrong");
    }
}));
/* Route to delete an appointment */
exports.DoctorRouter.put('/appointments/:appointmentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentId = Number(req.params['appointmentId']);
    const { newDate } = req.body;
    try {
        yield (0, Doctor_repo_1.changeDateById)(appointmentId, newDate);
        return res.status(200).send({ sucess: "Date updated successfully!" });
    }
    catch (error) {
        return res.status(500).send("Something went wrong");
    }
}));
