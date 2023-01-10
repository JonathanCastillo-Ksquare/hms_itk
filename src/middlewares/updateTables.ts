import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";
import { Admin } from "../models/admin.model";
import { Department } from "../models/departments.model";
import { getAllUsers, createUser } from "../firebase";
import { Request, Response } from "express";


export const updateTables = async (req: Request, res: Response, next: Function) => {
    try {
        const fireUsers = await getAllUsers();
        const patientUsers = await Patient.findAll();
        const parsedPatientUsers = patientUsers.map(patientUser => patientUser.toJSON());
        const doctorUsers = await Doctor.findAll();
        const parsedDoctorUsers = doctorUsers.map(doctorUsers => doctorUsers.toJSON());
        const adminUsers = await Admin.findAll();
        const parsedAdminUsers = adminUsers.map(adminUsers => adminUsers.toJSON());

        const patientNotInFire = parsedPatientUsers.filter(patient => !fireUsers.find(firePatient => firePatient.uid === patient.user_id));
        const doctorNotInFire = parsedDoctorUsers.filter(doctor => !fireUsers.find(fireDoctor => fireDoctor.uid === doctor.user_id));
        const adminNotInFire = parsedAdminUsers.filter(admin => !fireUsers.find(fireAdmin => fireAdmin.uid === admin.user_id));

        const patientNotInDB = fireUsers.filter(firePatient => !parsedPatientUsers.find(patient => firePatient.uid === patient.user_id));
        const doctorNotInDB = fireUsers.filter(fireDoctor => !parsedDoctorUsers.find(doctor => fireDoctor.uid === doctor.user_id));
        const adminNotInDB = fireUsers.filter(fireAdmin => !parsedAdminUsers.find(admin => fireAdmin.uid === admin.user_id));

        if (patientNotInFire) {
            patientNotInFire.forEach(async patient => {
                await Patient.destroy({
                    where: {
                        user_id: patient.user_id
                    }
                })
            })
        } else if (doctorNotInFire) {
            doctorNotInFire.forEach(async doctor => {
                await Doctor.destroy({
                    where: {
                        user_id: doctor.user_id
                    }
                })
            })
        } else if (adminNotInFire) {
            adminNotInFire.forEach(async admin => {
                await Admin.destroy({
                    where: {
                        user_id: admin.user_id
                    }
                })
            })
        }

        if (patientNotInDB) {
            patientNotInDB.forEach(async user => {
                if (user.role === "patient") {
                    await Patient.create({ user_id: user.uid });
                }
            })
        }
        else if (doctorNotInDB) {
            doctorNotInDB.forEach(async user => {
                if (user.role === "doctor") {
                    await Patient.create({ user_id: user.uid });
                }
            })
        }
        else if (adminNotInDB) {
            adminNotInDB.forEach(async user => {
                if (user.role === "admin") {
                    await Patient.create({ user_id: user.uid });
                }
            })
        }

        console.log("All tables are sync")
        return next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Something went wrong!" })
    }
}


export const createAdmin = async (displayName: string, email: string, pswrd: string) => {
    try {

        const userList = await getAllUsers();
        let user = userList.find((user) => {
            return user.email === email
        });

        if (user) {
            console.log("The user already exists")
        } else {
            const userId = await createUser(displayName, email, pswrd, "admin");
            const admin = Admin.create({ user_id: userId })
            return admin;
        }


    } catch (error) {

        console.error(error);

        return null

    }

}

export const createDepartments = async (department: string) => {
    try {


        const foundDepartment = await Department.findOne({ where: { department: department } });
        if (!foundDepartment) {
            const dep = Department.create({ department: department })
            return dep;
        }


    } catch (error) {

        console.error(error);

        return null

    }

}