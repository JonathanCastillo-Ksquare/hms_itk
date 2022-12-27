import { Patients } from "../models/Patients.model";

// Function to create a new patient
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

