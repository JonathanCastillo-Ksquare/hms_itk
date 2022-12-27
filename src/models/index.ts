/* This index is to initialize all the sequelize models */

import { Sequelize } from "sequelize";
import { initAdminsModel } from "./Admin.model";
import { initAppointmentsModel } from "./Appointments.model";
import { initDepartmentModel } from "./Departments.model";
import { initDoctorsModel } from "./Doctors.model";
import { initPatientsModel } from "./Patients.model";
import setup from "./Associations"

export let sequelize: Sequelize;

const models = [initAdminsModel, initAppointmentsModel, initDepartmentModel, initDoctorsModel, initPatientsModel];

export const startSequelize = (dbName: string, dbPass: string, dbHostname: string, dbUser: string) => {
    sequelize = new Sequelize(dbName, dbUser, dbPass, {
        dialect: 'postgres',
        host: dbHostname

    });

    for (const initModel of models) {
        initModel(sequelize);
    }

    setup();


    return sequelize;
}