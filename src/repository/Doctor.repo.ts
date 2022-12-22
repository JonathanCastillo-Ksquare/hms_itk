import { Doctors } from "../models/Doctors.model";

export const createDoctor = async (user_id: string) => {

    try {

        const doctor = await Doctors.create({

            user_id,
        })

        return doctor;

    } catch (error) {

        console.error(error);

        return null

    }

}