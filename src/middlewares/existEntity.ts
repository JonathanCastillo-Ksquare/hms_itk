import { Request, Response } from "express";
import { Patients } from "../models/Patients.model";
import { getAllUsers } from "../firebase";
import { Doctors } from "../models/Doctors.model";

export const existPatient = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const users = await getAllUsers();
        let user = users.find((user) => {
            return user.uid === res.locals.uid
        });
        if (user) {
            const patient = await Patients.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (patient) {
                res.locals = {
                    ...res.locals,
                    patient_id: patient.id
                };
            }
            return next();
        } else {
            return res.status(400).json({ error: `No patient found with that id!` });
        }
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
};

export const existDoctor = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const users = await getAllUsers();
        let user = users.find((user) => {
            return user.uid === res.locals.uid
        });
        if (user) {
            const doctor = await Doctors.findOne({
                where: {
                    user_id: user.uid,
                },
            });
            if (doctor) {
                res.locals = {
                    ...res.locals,
                    doctor_id: doctor.id
                };
            }
            return next();
        } else {
            return res.status(400).json({ error: `No doctor found with that id!` });
        }
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
};

