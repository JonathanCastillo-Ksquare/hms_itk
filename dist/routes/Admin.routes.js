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
exports.AdminRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
const Doctor_repo_1 = require("../repository/Doctor.repo");
const firebase_2 = require("../firebase");
const Admin_repo_1 = require("../repository/Admin.repo");
exports.AdminRouter = (0, express_1.Router)();
exports.AdminRouter.use(isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }));
exports.AdminRouter.post('/createDoctor', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    const users = yield (0, firebase_1.getAllUsers)();
    let user = users.find((user) => {
        return user.email === email;
    });
    if (user) {
        res.status(400).json({ error: "El email ya existe" });
    }
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'doctor');
        yield (0, Doctor_repo_1.createDoctor)(userId);
        console.log(userId);
        return res.status(201).send({
            userId: userId,
        });
    }
    catch (error) {
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
exports.AdminRouter.put('/changeStateAccount/:uid', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSameUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const { disabled } = req.body;
    try {
        const user = yield (0, firebase_2.disableUser)(uid, disabled);
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
/* Route to get all appointmenta of the patient */
exports.AdminRouter.get('/allAppointments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Pagination
    const { page = 0, size = 5 } = req.query;
    if (req.query.patientId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.patientId)
        };
        const appointments = yield (0, Admin_repo_1.getAllAppointmentsPatientById)(options);
        return res.status(200).send(appointments);
    }
    else if (req.query.doctorId) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: Number(req.query.doctorId)
        };
        const appointments = yield (0, Admin_repo_1.getAllAppointmentsDoctorById)(options);
        return res.status(200).send(appointments);
    }
    else if (req.query.appointmentActives) {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            param: String(req.query.appointmentActives)
        };
        if (options.param === "true" || options.param === "false") {
            const appointments = yield (0, Admin_repo_1.getAllAppointmentsIsDeletedProperty)(options);
            return res.status(200).send(appointments);
        }
        else {
            return res.status(500).send("No valid query");
        }
    }
    else if (req.query.orderBy && typeof req.query.orderBy === "string") {
        const query = req.query.orderBy;
        const splittedQuery = query.split("-");
        const entity = splittedQuery[0];
        const entity_id = splittedQuery[1];
        const order = splittedQuery[2];
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size),
            order: String(order),
            id: Number(entity_id)
        };
        if (entity === "patient") {
            const appointments = yield (0, Admin_repo_1.getAllAppointmentsPatientOrder)(options);
            return res.status(200).send(appointments);
        }
        else if (entity === "doctor") {
            const appointments = yield (0, Admin_repo_1.getAllAppointmentsDoctorOrder)(options);
            return res.status(200).send(appointments);
        }
    }
    else {
        let options = {
            limit: Number(size),
            offset: Number(page) * Number(size)
        };
        const appointments = yield (0, Admin_repo_1.getAllAppointments)(options);
        return res.status(200).send(appointments);
    }
}));
