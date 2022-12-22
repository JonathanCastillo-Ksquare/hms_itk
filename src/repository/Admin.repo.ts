import { createUser, getAllUsers } from "../firebase";
import { Admins } from "../models/Admin.model";

export const createAdmin = async (displayName: string, email: string, pswrd: string) => {
    try {

        const userList = await getAllUsers();
        let user = userList.find((user) => {
            return user.email === email
        });

        if (user) {
            console.log("The user already exists")
        } else {
            const userId = await createUser(displayName, email, pswrd, "admin");
            const admin = Admins.create({ user_id: userId })
            return admin;
        }


    } catch (error) {

        console.error(error);

        return null

    }

}





