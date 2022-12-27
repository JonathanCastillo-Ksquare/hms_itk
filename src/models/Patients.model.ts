/* Model to create the admin patient and table */

import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize, } from "sequelize";

export class Patients extends Model<InferAttributes<Patients>, InferCreationAttributes<Patients>> {
    declare id: CreationOptional<number>;
    declare user_id: string;

}


/* This function will be called in the index file from models folder */
// Function to init the patient model
export const initPatientsModel = async (sequelize: Sequelize) => {
    await Patients.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "patients",
            sequelize: sequelize,
        }
    );
};
