const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class databaseService {
    static getDatabaseServiceInstance() {
        return instance ? instance : new databaseService();
    }

    async getAllData() {
        try {

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = databaseService;