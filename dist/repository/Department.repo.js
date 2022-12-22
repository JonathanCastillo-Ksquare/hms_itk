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
exports.deleteDepartment = exports.createDepartment = void 0;
const Departments_model_1 = require("../models/Departments.model");
const createDepartment = (department) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentFound = yield Departments_model_1.Departments.findOne({ where: { department: department } });
        if (departmentFound) {
            console.log("The department already exists");
        }
        else {
            const departmentCreated = Departments_model_1.Departments.create({ department: department });
            return departmentCreated;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.createDepartment = createDepartment;
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedDep = yield Departments_model_1.Departments.destroy({
            where: {
                id: id
            }
        });
        return deletedDep;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteDepartment = deleteDepartment;
