const express = require('express');
const empleado = express.Router();
const db = require('../config/database');

empleado.post('/', async (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address } = req.body;

    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address) {
        const query = "INSERT INTO empleado(emp_name, emp_lastname, emp_phone, emp_mail, emp_address) VALUES(?, ?, ?, ?, ?)";
        const rows = await db.query(query, [emp_name, emp_lastname, emp_phone, emp_mail, emp_address]);

        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Empleado creado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.delete('/:id', async (req, res, next) => {
    const rows = await db.query("DELETE FROM empleado WHERE emp_id = ?", [req.params.id]);

    if (rows.affectedRows == 1) {
        return res.status(200).json({code: 200, message: "Empleado eliminado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleado.put('/:id', async (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address } = req.body;

    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address) {
        let query = "UPDATE empleado SET emp_name = ?, emp_lastname = ?, emp_phone = ?, emp_mail = ?, emp_address = ?";
        query += " WHERE emp_id = ?";
        const rows = await db.query(query, [emp_name, emp_lastname, emp_phone, emp_mail, emp_address, req.params.id]);

        if (rows.affectedRows == 1) {
            return res.status(200).json({code: 200, message: "Empleado actualizado correctamente"});
        }
        return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleado.get('/', async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleado");
    return res.status(200).json({code: 200, message: emp});
});

empleado.get('/:name', async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleado WHERE emp_name LIKE ?", ['%' + req.params.name + '%']);

    (emp.length > 0) ?
        res.status(200).json({code: 200, message: emp}) :
        res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

module.exports = empleado;
