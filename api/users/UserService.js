const db = require("../../config/db");

if (db) {
    console.log("DB connected");
} else {
    console.log("Fail to connect the DB");
}

module.exports = {
    create: (data, callback) => {
        var register_data = {
            first_name: data.first_name,
            last_name: data.last_name,
            class: data.class,
            email: data.email,
            password: data.password
        };

        db.query(
            `INSERT INTO registration SET ?`,
            register_data,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    getUsers: callback => {
        db.query(
            `SELECT id_account, first_name, last_name, class, email FROM registration`,
            [],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },
    getUserById: (id_account, callback) => {
        db.query(
            `SELECT id_account, first_name, last_name, class, email FROM registration WHERE id_account = ${id_account}`,
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        db.query(
            `UPDATE registration SET first_name=?, last_name=?, class=?, email=?, password=? WHERE id_account = ?`,
            [
                data.first_name,
                data.last_name,
                data.class,
                data.email,
                data.password,
                data.id_account
            ],
            (err, results, fields) => {
                if (err) return callback(err);
                if (!results) {
                    return results.json({
                        success: 0,
                        message: "Failed to update user"
                    });
                }
                return callback(null, results);
            }
        );
    },
    deleteUser: (id_account, callback) => {
        db.query(
            `DELETE FROM registration WHERE id_account = ?`,
            [id_account],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callback) => {
        db.query(
            `SELECT * FROM registration WHERE email = ?`,
            [email],
            (err, results, fields) => {
                if (err) return callback(err);
                return callback(null, results[0]);
            }
        );
    }
};
