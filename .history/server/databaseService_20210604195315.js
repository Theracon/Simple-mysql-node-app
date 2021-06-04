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
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM names;';

                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });

            return response;

        } catch (err) {
            console.log(err);
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO names (name, date_added) VALUES (?,?);';

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result.insertId);
                    }
                });
            });

            return {
                id: insertId,
                name: name,
                dateAdded: dateAdded
            };

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = databaseService;