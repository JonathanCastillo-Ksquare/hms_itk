import { InferAttributes, InferCreationAttributes, Model, DataTypes, CreationOptional, Sequelize, } from "sequelize";

export class Departments extends Model<InferAttributes<Departments>, InferCreationAttributes<Departments>> {
    declare id: CreationOptional<number>;
    declare department: string;
}

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