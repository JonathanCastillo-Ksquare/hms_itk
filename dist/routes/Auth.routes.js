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
exports.AuthRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const Patient_repo_1 = require("../repository/Patient.repo");
exports.AuthRouter = (0, express_1.Router)();
//Si quiero que todas mis rutas esten protegidas puedo poner el middleware a nivel del router
//UserRoutees.use(isAuthenticated)
exports.AuthRouter.post('/signUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Info desde el body
    //Checar si falta info
    //Checar que el rol sea adecuado
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    const users = yield (0, firebase_1.getAllUsers)();
    let user = users.find((user) => {
        return user.email === email;
    });
    if (user) {
        res.status(400).json({ error: "El email ya existe" });
    }
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
        yield (0, Patient_repo_1.createPatient)(userId);
        console.log(userId);
        return res.status(201).send({
            userId: userId,
        });
    }
    catch (error) {
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
exports.AuthRouter.put('/deleteAccount', isAuthenticated_1.isAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = res.locals;
    const { disabled } = req.body;
    try {
        const user = yield (0, firebase_1.disableUser)(uid, disabled);
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
exports.AuthRouter.get('/getAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, firebase_1.getAllUsers)();
        return res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
}));
