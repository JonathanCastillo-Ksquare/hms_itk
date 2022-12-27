// Function to create departments, THESE ONLY CAN BE CREATE BY USING CODE, YOU CAN CREATE THEM IN THE MAIN INDEX FILE

import { Departments } from "../models/Departments.model";

// Function to create a new department
export const createDepartment = async (department: string) => {
    try {

        const departmentFound = await Departments.findOne({ where: { department: department } })
        if (departmentFound) {
            console.log("The department already exists");
        } else {
            const departmentCreated = Departments.create({ department: department })
            return departmentCreated;
        }



    } catch (error) {

        console.error(error);

        return null

    }

}

// Function to delete a department if necessary
export const deleteDepartment = async (id: number) => {
    try {

        const deletedDep = await Departments.destroy({
            where: {
                id: id
            }
        })
        return deletedDep;




    } catch (error) {

        console.error(error);

        return null

    }

}