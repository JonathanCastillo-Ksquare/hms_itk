/* Model to create the admin entity and table */

import { InferAttributes, InferCreationAttributes, Model, DataTypes, CreationOptional, Sequelize, } from "sequelize";

export class Admins extends Model<InferAttributes<Admins>, InferCreationAttributes<Admins>> {
    declare id: CreationOptional<number>;
    declare user_id: string;
}

/* This function will be called in the index file from models folder */
// Function to init the admin model
export const initAdminsModel = async (sequelize: Sequelize) => {
    await Admins.init(
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
        },
        {
            tableName: "admins",
            sequelize: sequelize,
        }
    );
};