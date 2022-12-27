/* Model to create the doctor entity and table */

import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional, Sequelize, ForeignKey } from "sequelize";
import { Departments } from "./Departments.model";

export class Doctors extends Model<InferAttributes<Doctors>, InferCreationAttributes<Doctors>> {
    declare id: CreationOptional<number>;
    declare user_id: string;
    declare department_id: ForeignKey<Departments['id']>;;
    declare isAvailable: CreationOptional<boolean>;
}

/* This function will be called in the index file from models folder */
// Function to init the doctor model
export const initDoctorsModel = async (sequelize: Sequelize) => {
    await Doctors.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "doctors",
            sequelize: sequelize,
        }
    );
};