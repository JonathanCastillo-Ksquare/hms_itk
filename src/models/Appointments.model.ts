/* Model to create the appointments entity and table */
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, ForeignKey, } from "sequelize";
import { Doctors } from "./Doctors.model";
import { Patients } from "./Patients.model";

export class Appointments extends Model<InferAttributes<Appointments>, InferCreationAttributes<Appointments>> {
    declare id: CreationOptional<number>;
    declare doctor_id: ForeignKey<Doctors['id']>;
    declare patient_id: ForeignKey<Patients['id']>;
    declare date: Date;
    declare status: CreationOptional<boolean>;

}

/* This function will be called in the index file from models folder */
// Function to init the appointments model
export const initAppointmentsModel = async (sequelize: Sequelize) => {
    await Appointments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "appointments",
            sequelize: sequelize,
            // For soft delete
            paranoid: true,
            deletedAt: 'softDelete'
        }
    );

};