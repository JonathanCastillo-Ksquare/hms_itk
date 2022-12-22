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
exports.createPatient = void 0;
const Patients_model_1 = require("../models/Patients.model");
const createPatient = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield Patients_model_1.Patients.create({
            user_id
        });
        return patient;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createPatient = createPatient;
