"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    prod: {},
    dev: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOSTNAME,
        port: 5431
    },
    test: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT
    }
};
