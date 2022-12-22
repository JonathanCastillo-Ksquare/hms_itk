import { Patients } from "../models/Patients.model";

export const createPatient = async (user_id: string) => {

    try {

        const patient = await Patients.create({

            user_id
        })

        return patient;

    } catch (error) {

        console.error(error);

        return null

    }

}

