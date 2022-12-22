"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Admin_model_1 = require("./Admin.model");
const Appointments_model_1 = require("./Appointments.model");
const Departments_model_1 = require("./Departments.model");
const Doctors_model_1 = require("./Doctors.model");
const Patients_model_1 = require("./Patients.model");
const Associations_1 = __importDefault(require("./Associations"));
const models = [Admin_model_1.initAdminsModel, Appointments_model_1.initAppointmentsModel, Departments_model_1.initDepartmentModel, Doctors_model_1.initDoctorsModel, Patients_model_1.initPatientsModel];
const startSequelize = (dbName, dbPass, dbHostname, dbUser) => {
    exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
        dialect: 'postgres',
        host: dbHostname
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    (0, Associations_1.default)();
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
