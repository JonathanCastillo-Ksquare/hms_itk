"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const firebase_1 = require("../firebase");
const Admin_model_1 = require("../models/Admin.model");
const createAdmin = (displayName, email, pswrd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield (0, firebase_1.getAllUsers)();
        let user = userList.find((user) => {
            return user.email === email;
        });
        if (user) {
            console.log("The user already exists");
        }
        else {
            const userId = yield (0, firebase_1.createUser)(displayName, email, pswrd, "admin");
            const admin = Admin_model_1.Admins.create({ user_id: userId });
            return admin;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createAdmin = createAdmin;
