import { Departments } from "../models/Departments.model";
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