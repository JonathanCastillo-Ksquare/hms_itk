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
exports.existPatient = void 0;
const Patients_model_1 = require("../models/Patients.model");
const firebase_1 = require("../firebase");
const existPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, firebase_1.getAllUsers)();
        let user = users.find((user) => {
            return user.uid === res.locals.uid;
        });
        if (user) {
            const patient = yield Patients_model_1.Patients.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (patient) {
                res.locals = Object.assign(Object.assign({}, res.locals), { patient_id: patient.id });
            }
            return next();
        }
        else {
            return res.status(400).json({ error: `No patient with that id!` });
        }
    }
    catch (error) {
        return res.status(500).json("Something went wrong");
    }
});
exports.existPatient = existPatient;
