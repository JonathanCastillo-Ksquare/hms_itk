/* Init the database and the express server */


import dotenv from 'dotenv';
dotenv.config();
import { startSequelize } from './models';
import * as admin from "firebase-admin";
import app from './app';
import environments from './models/configDBs';
import { createAdmin } from './repository/Admin.repo';
import { createDepartment } from './repository/Department.repo';


admin.initializeApp();

// Variables de entorno
const PORT = process.env.PORT;

const envRunning = process.env.ENVIRONMENT === 'testing' ? environments.test : environments.dev;

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(envRunning.database, envRunning.password, envRunning.host, envRunning.username);
        await sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' });
        /*                                      Auth Module - Requirements
    2. Only allow admin users to be created via your DBMS shell and not expose this role to your server by any means.   */
        await createAdmin("admin1", "admin1@admin.com", "admin123456789");
        await createDepartment("Gastroenterology"); //Change the parameter to create another department
        console.log('DB and express server are up and running');
    } catch (error) {
        console.log(error);
        process.abort();
    }
})