const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

// Solo existe login: los usuarios se dan de alta directamente en la base de datos
user.post('/login', async (req, res, next) => {
    const {user_mail, user_password} = req.body;

    if (user_mail && user_password) {
        const query = "SELECT * FROM user WHERE user_mail = ? AND user_password = ?";
        const rows = await db.query(query, [user_mail, user_password]);

        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, process.env.JWT_KEY || "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

module.exports = user;
