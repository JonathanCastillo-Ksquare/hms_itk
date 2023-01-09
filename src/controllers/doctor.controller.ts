import { Request, Response } from "express";
import { Doctor } from "../models/doctor.model";
import { Appointment } from "../models/appointments.model";
import { Patient } from "../models/patient.model";

const doctorcontroller = {
    getAllDoctorAppointments: async (req: Request, res: Response) => {
        const { uid } = res.locals;
        const { page = 0, size = 5, orderBy, dateFilter, patientFilter } = req.query;

        if (dateFilter) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                filter: String(dateFilter)
            }

            try {
                const { count, rows } = await Appointment.findAndCountAll({
                    attributes: ["appointment_id", "date", "status", "patient_id"],
                    offset: options.offset,
                    limit: options.limit,
                    where: {
                        date: options.filter
                    }
                });
                return res.status(200).json({
                    status: "success",
                    total: count,
                    appointment: rows
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
        else if (patientFilter) {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                filter: Number(patientFilter)
            }

            try {
                const { count, rows } = await Appointment.findAndCountAll({
                    include: {
                        model: Patient,
                        attributes: ["patient_id"],
                        where: {
                            patient_id: options.filter
                        }
                    },
                    attributes: ["appointment_id", "date", "status", "patient_id"],
                    offset: options.offset,
                    limit: options.limit
                });
                return res.status(200).json({
                    status: "success",
                    total: count,
                    appointment: rows
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }
        }
        else if (orderBy) {

            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size),
                order: String(orderBy),
            }

            try {
                const { count, rows } = await Appointment.findAndCountAll({
                    include: {
                        model: Doctor,
                        attributes: ["doctor_id"],
                        where: {
                            user_id: uid
                        }
                    },
                    attributes: ["appointment_id", "date", "status", "patient_id"],
                    offset: options.offset,
                    limit: options.limit,
                    order: [['createdAt', options.order]]
                });
                return res.status(200).json({
                    status: "success",
                    total: count,
                    appointment: rows
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }
            // By Patient

        }
        // Get all appointments of the doctor
        else {
            let options = {
                limit: Number(size),
                offset: Number(page) * Number(size)
            }

            try {
                const { count, rows } = await Appointment.findAndCountAll({
                    offset: options.offset,
                    limit: options.limit,
                    include: {
                        model: Doctor,
                        attributes: ['doctor_id'],
                        where: {
                            user_id: uid
                        }
                    },
                    where: {
                        status: true
                    }
                });
                return res.status(200).json({
                    status: "success",
                    total: count,
                    appointment: rows
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Something went wrong!" });
            }

        }
    },
    changeDate: async (req: Request, res: Response) => {
        const appointmentId = Number(req.params['id']);
        const { newDate } = req.body;

        try {
            const doctorAppointment = await Appointment.update({
                date: newDate
            }, {
                where: {
                    appointment_id: appointmentId
                }
            });
            return res.status(200).json({ success: "Date changed succesfully!" })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Something went wrong!" })
        }
    }
}

export default doctorcontroller;