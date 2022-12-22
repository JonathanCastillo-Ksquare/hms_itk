"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Appointments_model_1 = require("./Appointments.model");
const Departments_model_1 = require("./Departments.model");
const Doctors_model_1 = require("./Doctors.model");
const Patients_model_1 = require("./Patients.model");
const setupAssociations = () => {
    Patients_model_1.Patients.hasMany(Appointments_model_1.Appointments, { foreignKey: "patient_id" });
    Appointments_model_1.Appointments.belongsTo(Patients_model_1.Patients, { foreignKey: "patient_id", });
    Doctors_model_1.Doctors.hasMany(Appointments_model_1.Appointments, { foreignKey: "doctor_id" });
    Appointments_model_1.Appointments.belongsTo(Doctors_model_1.Doctors, { foreignKey: "doctor_id" });
    Departments_model_1.Departments.hasMany(Doctors_model_1.Doctors, { foreignKey: "department_id" });
    Doctors_model_1.Doctors.hasMany(Departments_model_1.Departments, { foreignKey: "department_id" });
};
exports.default = setupAssociations;
