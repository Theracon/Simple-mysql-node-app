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

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = 'DELETE FROM names WHERE id = ?;';

                connection.query(query, [id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result.affectedRows);
                    }
                });
            });

            return response === 1 ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";

                connection.query(query, [name, id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result.affectedRows);
                    }
                });
            });

            return response === 1 ? true : false;

        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM names WHERE name = ?;';

                connection.query(query, [name], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    } else {
                        resolve(result);
                    }
                });
            });

            console.log(response);
            return response;

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = databaseService;