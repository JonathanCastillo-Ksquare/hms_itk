/* Model to create the department entity and table */

import { InferAttributes, InferCreationAttributes, Model, DataTypes, CreationOptional, Sequelize, } from "sequelize";

export class Departments extends Model<InferAttributes<Departments>, InferCreationAttributes<Departments>> {
    declare id: CreationOptional<number>;
    declare department: string;
}

/* This function will be called in the index file from models folder */
// Function to init the department model
export const initDepartmentModel = async (sequelize: Sequelize) => {
    await Departments.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            department: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "departments",
            sequelize: sequelize,
        }
    );

};