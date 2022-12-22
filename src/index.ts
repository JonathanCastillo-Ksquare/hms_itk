// Iniciar mi base de datos y mi servidor de express
import dotenv from 'dotenv';
dotenv.config();
import { startSequelize } from './models';
import * as admin from "firebase-admin";
import app from './app';
import environments from './models/configDBs';
import { createAdmin } from './repository/Admin.repo';
import { createDepartment, deleteDepartment } from './repository/Department.repo';


admin.initializeApp();

// Variables de entorno
const PORT = process.env.PORT;

const envRunning = process.env.ENVIRONMENT === 'testing' ? environments.test : environments.dev;

app.listen(PORT, async () => {
    try {
        const sequelize = startSequelize(envRunning.database, envRunning.password, envRunning.host, envRunning.username);
        await sequelize.sync({ force: process.env.ENVIRONMENT === 'testing' });
        await createAdmin("admin1", "admin1@admin.com", "admin123456789");
        await createDepartment("Gastroenterology");
        console.log('DB and express server are up and running');
    } catch (error) {
        console.log(error);
        process.abort();
    }
})