require('dotenv').config();

const {
    NODE_ENV,
    JWT_SECRET_KEY,
    PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_NAME,
    MYSQL_DIALECT,
} = process.env;


module.exports = {
    appEnv: NODE_ENV,
    port: PORT || 2022,
    database: {
        username: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_NAME,
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: MYSQL_DIALECT,
    },
    auth: {
        secret: JWT_SECRET_KEY,
    },
};