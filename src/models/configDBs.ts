export default {
    prod: {},
    dev: {
        database: <string>process.env.DB_NAME,
        username: <string>process.env.DB_USER,
        password: <string>process.env.DB_PASS,
        host: <string>process.env.DB_HOSTNAME,
        port: 5431
    },
    test: {
        database: <string>process.env.DB_NAME,
        username: <string>process.env.DB_USER,
        password: <string>process.env.DB_PASS,
        host: <string>process.env.DB_HOSTNAME,
        port: <string>process.env.DB_PORT
    }
}