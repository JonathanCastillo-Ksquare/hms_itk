"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// configuracion de express en su propio archivo
const express_1 = __importDefault(require("express"));
const Auth_routes_1 = require("./routes/Auth.routes");
const Patient_routes_1 = require("./routes/Patient.routes");
const Admin_routes_1 = require("./routes/Admin.routes");
const Doctor_routes_1 = require("./routes/Doctor.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Firebase
app.use('/auth', Auth_routes_1.AuthRouter);
app.use('/patient', Patient_routes_1.PatientRouter);
app.use('/doctor', Doctor_routes_1.DoctorRouter);
app.use('/admin', Admin_routes_1.AdminRouter);
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEE!');
});
exports.default = app;
