import 'dotenv/config';
import app from './app';
import { init } from './database/connection';
import './models/associations';
import * as admin from "firebase-admin";
admin.initializeApp();

import { createAdmin, createDepartments, updateTables } from './middlewares/updateTables';
import { Department } from './models/departments.model';


const PORT = process.env.PORT;

async function main() {
    await init();
    app.listen(PORT, async () => {
        console.log('Server running on port:', PORT);
        createAdmin("admin", "admin@admin.com", "123456789");
        createDepartments("Cardiology");
        createDepartments("Neurology");
        createDepartments("Ginecology");

    });

}

main();
