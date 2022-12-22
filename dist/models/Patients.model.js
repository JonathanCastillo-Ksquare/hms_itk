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
exports.initPatientsModel = exports.Patients = void 0;
const sequelize_1 = require("sequelize");
class Patients extends sequelize_1.Model {
}
exports.Patients = Patients;
const initPatientsModel = (sequelize) => __awaiter(void 0, void 0, void 0, function* () {
    yield Patients.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: "patients",
        sequelize: sequelize,
    });
});
exports.initPatientsModel = initPatientsModel;
