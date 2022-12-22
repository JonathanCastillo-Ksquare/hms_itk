import { Request, Response } from "express";
import { Patients } from "../models/Patients.model";
import { getAllUsers } from "../firebase";

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
            return res.status(400).json({ error: `No patient with that id!` });
        }
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
};

