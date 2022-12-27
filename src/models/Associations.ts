/* This file is to make all the associations */

import { Appointments } from "./Appointments.model";
import { Departments } from "./Departments.model";
import { Doctors } from "./Doctors.model";
import { Patients } from "./Patients.model";

const setupAssociations = () => {

    Patients.hasMany(Appointments, { foreignKey: "patient_id" });
    Appointments.belongsTo(Patients, { foreignKey: "patient_id", });

    Doctors.hasMany(Appointments, { foreignKey: "doctor_id" });
    Appointments.belongsTo(Doctors, { foreignKey: "doctor_id" });

    Departments.hasMany(Doctors, { foreignKey: "department_id" });
    Doctors.hasMany(Departments, { foreignKey: "department_id" });


}

export default setupAssociations;