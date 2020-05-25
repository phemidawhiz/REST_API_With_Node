const {
    create,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByEmail
} = require("./UserService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(`${body.password}`, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserById: (req, res) => {
        const id_account = req.params.id;
        getUserById(id_account, (err, results) => {
            if (err) return console.log(err);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) return console.log(err);
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUsers: (req, res) => {
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(`${body.password}`, salt);
        updateUser(body, (err, results) => {
            if (err) return console.log(err);
            return res.json({
                success: 1,
                message: "Updated successfully!"
            });
        });
    },
    deleteUser: (req, res) => {
        const id_account = req.params.id;
        deleteUser(id_account, (err, results) => {
            if (err) return console.log(err);
            if (results) {
                return res.json({
                    success: 0,
                    message: "Record not found!"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully!"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) return console.log(err);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = bcrypt.compareSync(
                `${body.password}`,
                `${results.password}`
            );
            if (result) {
                results.password = undefined;
                const jsonToken = jwt.sign(
                    { result: results },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.json({
                    success: 1,
                    message: "Login successfully!",
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
};
